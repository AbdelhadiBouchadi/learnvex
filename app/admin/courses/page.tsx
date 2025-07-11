import { adminGetCourses } from "@/app/data/admin/admin-get-courses";
import { AdminCourseCard } from "@/components/shared/admin/courses/AdminCourseCard";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function CoursesPage() {
  const data = await adminGetCourses();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Courses</h1>
        <Button asChild>
          <Link href="/admin/courses/create">
            Create Course
            <PlusIcon />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
        {data.map((course, idx) => {
          return <AdminCourseCard key={idx} data={course} />;
        })}
      </div>
    </>
  );
}
