"use server";

import { courseSchema, CourseSchemaType } from "@/lib/validator";

export async function createCourse(data: CourseSchemaType) {
  try {
    const validation = courseSchema.safeParse(data);
  } catch (error) {}
}
