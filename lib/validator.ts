import * as z from "zod";

export const courseLevels = ["Beginner", "Intermediate", "Advanced"] as const;
export const courseStatus = ["Draft", "Published", "Archived"] as const;
export const courseCategories = [
  "Development",
  "Business",
  "Finance",
  "IT & Software",
  "Office Productivity",
  "Personal Development",
  "Design",
  "Marketing",
  "Health & Fitness",
  "Music",
  "Teaching & Academics",
] as const;

export const courseSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Please provide a title for the course" })
    .max(100, { message: "The title shouldn't exceed 100 characters" }),
  description: z
    .string()
    .min(1, { message: "Please provide a description for the course" }),
  fileKey: z.string().min(1, { message: "File is required" }),
  price: z.coerce
    .number()
    .min(1, { message: "The price must be a positive number" }),
  duration: z.coerce
    .number()
    .min(1, { message: "Duration must be at least 1 hour long" })
    .max(500, { message: "Duration shouldn't exceed 500 hours long" }),
  level: z.enum(courseLevels, { message: "Level is required" }),
  category: z.enum(courseCategories, { message: "Category is required" }),
  smallDescription: z
    .string()
    .min(1, { message: "Please provide a small description for the course" })
    .max(100, {
      message: "The small description shouldn't exceed 200 characters",
    }),
  slug: z.string().min(3, { message: "Please provide a slug" }),
  status: z.enum(courseStatus, { message: "Status is required" }),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;

export const fileUploadSchema = z.object({
  fileName: z.string().min(1, { message: "File Name if required" }),
  contentType: z.string().min(1, { message: "Content Type is required" }),
  fileSize: z.number().min(1, { message: "File size if required" }),
  isImage: z.boolean(),
});
