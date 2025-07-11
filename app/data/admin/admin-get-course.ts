import "server-only";

import { db } from "@/lib/db";
import { requireAdmin } from "./require-admin";
import { notFound } from "next/navigation";

export async function adminGetCourse(courseId: string) {
  await requireAdmin();

  const data = await db.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      smallDescription: true,
      duration: true,
      level: true,
      status: true,
      price: true,
      fileKey: true,
      category: true,
      slug: true,
      chapter: {
        select: {
          id: true,
          title: true,
          position: true,
          lesson: {
            select: {
              id: true,
              title: true,
              description: true,
              thumbnailKey: true,
              position: true,
              videoKey: true,
            },
          },
        },
      },
    },
  });

  if (!data) return notFound();

  return data;
}

export type AdminCourseSingularType = Awaited<
  ReturnType<typeof adminGetCourse>
>;
