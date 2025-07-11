"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  rectIntersection,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useState } from "react";
import { SortableItem } from "../SortableItem";
import { AdminCourseSingularType } from "@/app/data/admin/admin-get-course";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FileTextIcon,
  GripVerticalIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CourseStructureProps {
  data: AdminCourseSingularType;
}

export default function CourseStructure({ data }: CourseStructureProps) {
  const initialItems =
    data.chapter.map((chapter) => ({
      id: chapter.id,
      title: chapter.title,
      order: chapter.position,
      isOpen: false, // Default chapters to open
      lessons: chapter.lesson.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        order: lesson.position,
      })),
    })) || [];

  const [items, setItems] = useState(initialItems);

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  function toggleChapter(chapterId: string) {
    setItems(
      items.map((chapter) =>
        chapter.id === chapterId
          ? { ...chapter, isOpen: !chapter.isOpen }
          : chapter,
      ),
    );
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
  );

  return (
    <DndContext
      collisionDetection={rectIntersection}
      sensors={sensors}
      onDragEnd={handleDragEnd}
    >
      <Card>
        <CardHeader className="border-border flex flex-row items-center justify-between border-b">
          <CardTitle>Chapters</CardTitle>
        </CardHeader>
        <CardContent>
          <SortableContext strategy={verticalListSortingStrategy} items={items}>
            {items.map((item) => (
              <SortableItem
                id={item.id}
                data={{ type: "chapter" }}
                key={item.id}
              >
                {(listeners) => (
                  <Card>
                    <Collapsible
                      open={item.isOpen}
                      onOpenChange={() => toggleChapter(item.id)}
                    >
                      <div
                        className="border-border flex items-center justify-between border-b p-3"
                        onClick={() => toggleChapter(item.id)}
                      >
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="cursor-grab opacity-60 hover:opacity-100"
                            {...listeners}
                          >
                            <GripVerticalIcon className="size-4" />
                          </Button>

                          <CollapsibleTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="flex items-center"
                            >
                              {item.isOpen ? (
                                <ChevronDownIcon className="size-4" />
                              ) : (
                                <ChevronRightIcon className="size-4" />
                              )}
                            </Button>
                          </CollapsibleTrigger>

                          <p className="hover:text-primary cursor-pointer">
                            {item.title}
                          </p>
                        </div>

                        <Button size="icon" variant="outline">
                          <Trash2Icon className="text-destructive" />
                        </Button>
                      </div>

                      <CollapsibleContent>
                        <div className="p-1">
                          <SortableContext
                            items={item.lessons.map((lesson) => lesson.id)}
                            strategy={verticalListSortingStrategy}
                          >
                            {item.lessons.map((lesson) => (
                              <SortableItem
                                key={lesson.id}
                                id={lesson.id}
                                data={{ type: "lesson", chapterId: item.id }}
                              >
                                {(lessonListeners) => (
                                  <div className="flex items-center justify-between rounded-sm p-2">
                                    <div className="flex items-center gap-2">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="cursor-grab opacity-60 hover:opacity-100"
                                        {...lessonListeners}
                                      >
                                        <GripVerticalIcon />
                                      </Button>
                                      <FileTextIcon className="size-4" />

                                      <Link
                                        href={`/admin/courses/${data.id}/${item.id}/${lesson.id}`}
                                        className="underline-offset-2 hover:underline"
                                      >
                                        {lesson.title}
                                      </Link>
                                    </div>
                                    <Button variant="outline" size="icon">
                                      <Trash2Icon className="text-destructive" />
                                    </Button>
                                  </div>
                                )}
                              </SortableItem>
                            ))}
                          </SortableContext>
                          <div className="p-2">
                            <Button variant="outline" className="w-full">
                              Create New Lesson
                              <PlusIcon />
                            </Button>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                )}
              </SortableItem>
            ))}
          </SortableContext>
        </CardContent>
      </Card>
    </DndContext>
  );
}
