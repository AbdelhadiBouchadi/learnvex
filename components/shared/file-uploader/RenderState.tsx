import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  UploadCloudIcon as CloudUploadIcon,
  FileUpIcon,
  ImageIcon,
  XIcon,
  Loader2Icon,
} from "lucide-react";
import Image from "next/image";

export function RenderEmptyState({ isDragActive }: { isDragActive: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div
        className={cn(
          "bg-muted dark:bg-secondary mx-auto flex size-16 items-center justify-center rounded-full transition-all duration-300",
          isDragActive && "bg-primary/10 scale-110",
        )}
      >
        <CloudUploadIcon
          className={cn(
            "text-muted-foreground size-8 transition-all duration-300",
            isDragActive && "text-primary scale-110",
          )}
        />
      </div>

      <div className="space-y-2">
        <p className="text-foreground text-lg font-semibold">
          Drop Your Files Here
        </p>
        <p className="text-muted-foreground text-sm">
          or{" "}
          <span className="text-primary cursor-pointer font-semibold transition-all duration-200 hover:underline hover:underline-offset-2">
            click to browse
          </span>
        </p>
      </div>

      <Button type="button" className="mt-2 gap-2 px-6">
        <FileUpIcon className="size-4" />
        Select File
      </Button>

      <p className="text-muted-foreground text-xs">Maximum file size: 5MB</p>
    </div>
  );
}

export function RenderErrorState() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="bg-destructive/30 mx-auto flex size-16 animate-pulse items-center justify-center rounded-full">
        <ImageIcon className="text-destructive size-8" />
      </div>

      <div className="space-y-2">
        <p className="text-foreground text-lg font-semibold">Upload Failed</p>
        <p className="text-muted-foreground text-sm">
          Something went wrong while uploading your file
        </p>
      </div>

      <Button type="button" className="mt-2 gap-2 px-6">
        <FileUpIcon className="size-4" />
        Try Again
      </Button>
    </div>
  );
}

export function RenderUploadingState({
  progress = 0,
  file,
}: {
  progress: number;
  file: File;
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-4 text-center">
      <div className="bg-muted dark:bg-secondary mx-auto flex size-16 items-center justify-center rounded-full">
        <Loader2Icon className="text-primary size-8 animate-spin" />
      </div>

      <div className="w-full space-y-2">
        <p className="text-foreground text-lg font-semibold">Uploading File</p>
        {file && (
          <p className="text-muted-foreground mx-auto max-w-xs truncate text-sm">
            {file.name}
          </p>
        )}
      </div>

      <div className="w-full max-w-xs space-y-2">
        <div className="bg-muted h-2 overflow-hidden rounded-full">
          <div
            className="bg-primary h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-muted-foreground text-xs">{progress}% uploaded</p>
      </div>
    </div>
  );
}

interface RenderUploadedStateProps {
  previewUrl: string;
  isDeleting: boolean;
  onDelete: () => void;
}

export function RenderUploadedState({
  previewUrl,
  isDeleting,
  onDelete,
}: RenderUploadedStateProps) {
  return (
    <div className="group relative h-full w-full">
      <Image
        src={previewUrl}
        alt="Preview Image"
        className="object-contain"
        fill
      />

      <Button
        type="button"
        size="icon"
        variant="destructive"
        className="absolute top-2 right-2 size-8"
        onClick={onDelete}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <Loader2Icon className="size-4 animate-spin" />
        ) : (
          <XIcon className="size-4" />
        )}
      </Button>
    </div>
  );
}
