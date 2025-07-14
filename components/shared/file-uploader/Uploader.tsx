"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import {
  RenderEmptyState,
  RenderErrorState,
  RenderUploadedState,
  RenderUploadingState,
} from "./RenderState";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

interface FileStateProps {
  id: string | null;
  file: File | null;
  isUploading: boolean;
  progress: number;
  key?: string;
  isDeleting: boolean;
  error: boolean;
  objectUrl?: string;
  fileType: "image" | "video";
}

interface UploaderProps {
  value?: string;
  onValueChange?: (value: string) => void;
  fileUrl?: string;
}

export function Uploader({ value, onValueChange, fileUrl }: UploaderProps) {
  const [fileState, setFileState] = useState<FileStateProps>({
    id: null,
    file: null,
    isUploading: false,
    isDeleting: false,
    progress: 0,
    key: value,
    error: false,
    fileType: "image",
    objectUrl: fileUrl,
  });

  const handleFileUpload = async (file: File, retryCount = 0) => {
    const maxRetries = 3;

    setFileState((prev) => ({
      ...prev,
      isUploading: true,
      progress: 0,
    }));

    try {
      // 1. Get presigned URL
      const presignedResponse = await fetch("/api/s3/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          fileSize: file.size,
          isImage: true,
        }),
      });

      if (!presignedResponse.ok) {
        const errorData = await presignedResponse.json().catch(() => ({}));
        console.error("Presigned URL error:", errorData);
        toast.error("Failed to get presigned URL");

        setFileState((prev) => ({
          ...prev,
          isUploading: false,
          progress: 0,
          error: true,
        }));

        return;
      }

      const { presignedUrl, key } = await presignedResponse.json();

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.timeout = 300000; // 5 minutes

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentageCompleted = (event.loaded / event.total) * 100;

            setFileState((prev) => ({
              ...prev,
              progress: Math.round(percentageCompleted),
            }));
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 204) {
            setFileState((prev) => ({
              ...prev,
              progress: 100,
              isUploading: false,
              key,
            }));

            onValueChange?.(key);

            toast.success("File Uploaded Successfully");

            resolve();
          } else {
            console.error(
              "Upload failed with status:",
              xhr.status,
              xhr.statusText,
            );
            reject(new Error("Upload Failed"));
          }
        };

        xhr.onerror = (error) => {
          console.error("XHR Error:", error);
          reject(new Error("Upload Failed"));
        };

        xhr.ontimeout = () => {
          console.error("Upload timeout");
          reject(new Error("Upload timeout"));
        };

        xhr.onabort = () => {
          console.error("Upload aborted");
          reject(new Error("Upload aborted"));
        };

        xhr.open("PUT", presignedUrl);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });
    } catch (error) {
      console.error("Upload error:", error);

      // Retry logic
      if (retryCount < maxRetries) {
        console.log(`Retrying upload (${retryCount + 1}/${maxRetries})...`);
        toast.info(
          `Upload failed, retrying... (${retryCount + 1}/${maxRetries})`,
        );

        // Wait before retrying (exponential backoff)
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, retryCount) * 1000),
        );

        return handleFileUpload(file, retryCount + 1);
      }
      toast.error("Something went wrong ...");
      setFileState((prev) => ({
        ...prev,
        progress: 0,
        error: true,
        isUploading: false,
      }));
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
          URL.revokeObjectURL(fileState.objectUrl);
        }

        setFileState({
          file,
          isUploading: false,
          progress: 0,
          objectUrl: URL.createObjectURL(file),
          error: false,
          id: uuidv4(),
          isDeleting: false,
          fileType: "image",
        });

        handleFileUpload(file);
      }
    },
    [fileState.objectUrl],
  );

  const onFileRejected = (rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length > 0) {
      const tooManyFiles = rejectedFiles.find(
        (rejection) => rejection.errors[0].code === "too-many-files",
      );

      const fileSizeTooBig = rejectedFiles.find(
        (rejection) => rejection.errors[0].code === "file-too-large",
      );

      if (fileSizeTooBig) {
        toast.error("The file size should not exceed 5MB");
      }

      if (tooManyFiles) {
        toast.error("Too many files selected. Only one file is permitted");
      }
    }
  };

  const renderContent = () => {
    if (fileState.isUploading) {
      return (
        <RenderUploadingState
          progress={fileState.progress}
          file={fileState.file as File}
        />
      );
    }

    if (fileState.error) {
      return <RenderErrorState />;
    }

    if (fileState.objectUrl) {
      return (
        <RenderUploadedState
          previewUrl={fileState.objectUrl}
          isDeleting={fileState.isDeleting}
          onDelete={handleRemoveFile}
        />
      );
    }

    return <RenderEmptyState isDragActive={isDragActive} />;
  };

  const handleRemoveFile = async () => {
    if (fileState.isDeleting || !fileState.objectUrl) return;

    try {
      setFileState((prev) => ({
        ...prev,
        isDeleting: true,
      }));

      const response = await fetch("/api/s3/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: fileState.key,
        }),
      });

      if (!response.ok) {
        toast.error("Failed To Remove File");
        setFileState((prev) => ({
          ...prev,
          isDeleting: true,
          error: true,
        }));

        return;
      }

      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }

      onValueChange?.("");

      setFileState({
        file: null,
        isUploading: false,
        progress: 0,
        objectUrl: undefined,
        error: false,
        fileType: "image",
        id: null,
        isDeleting: false,
      });

      toast.success("Filed Removed Successfully");
    } catch (error) {
      toast.error("Error Removing File");

      setFileState((prev) => ({
        ...prev,
        error: false,
        isDeleting: false,
      }));

      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }
    };
  }, [fileState.objectUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024, //Max file size is set to 5MB
    onDropRejected: onFileRejected,
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative h-64 w-full rounded-lg border-2 border-dashed py-0 transition-colors duration-200",
        isDragActive
          ? "border-primary bg-primary/10 border-solid"
          : "border-border hover:border-primary",
        fileState.isUploading || fileState.objectUrl || fileState.isDeleting
          ? "cursor-default"
          : "cursor-pointer",
      )}
    >
      <CardContent className="flex h-full w-full items-center justify-center rounded-lg">
        <input
          {...getInputProps()}
          disabled={
            fileState.isUploading ||
            // !!fileState.objectUrl ||
            fileState.isDeleting
          }
        />
        {renderContent()}
      </CardContent>
    </Card>
  );
}
