import { adminGetCourse } from "@/app/data/admin/admin-get-course";
import CourseStructure from "@/components/shared/admin/courses/CourseStructure";
import EditCourseForm from "@/components/shared/admin/courses/EditCourseForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

type Params = Promise<{ courseId: string }>;

export default async function EditCoursePage({ params }: { params: Params }) {
  const { courseId } = await params;

  const data = await adminGetCourse(courseId);

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        Edit Course :{" "}
        <span className="text-primary underline underline-offset-2">
          {data.title}
        </span>
      </h1>
      <Tabs defaultValue="basic-info" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
          <TabsTrigger value="course-structure">Course Structure</TabsTrigger>
        </TabsList>
        <TabsContent value="basic-info">
          <Card>
            <CardHeader>
              <CardTitle>Basic Info</CardTitle>
              <CardDescription>
                Edit basic information about the course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EditCourseForm data={data} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="course-structure">
          <Card>
            <CardHeader>
              <CardTitle>Course Structure</CardTitle>
              <CardDescription>
                Here you can edit your course structure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CourseStructure data={data} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
