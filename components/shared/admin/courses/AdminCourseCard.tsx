import { AdminCourseType } from "@/app/data/admin/admin-get-courses";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConstructUrl } from "@/hooks/use-construct-url";
import {
  EyeIcon,
  MoreVerticalIcon,
  PencilLineIcon,
  SchoolIcon,
  TimerIcon,
  Trash2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AdminCourseCardProps {
  data: AdminCourseType;
}

export function AdminCourseCard({ data }: AdminCourseCardProps) {
  const thumbnailUrl = useConstructUrl(data.fileKey);

  return (
    <Card className="group relative gap-0 py-0">
      {/* Absolute Dropdown */}
      <div className="absolute top-2 right-2 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <MoreVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${data.id}/edit`}>
                <PencilLineIcon />
                Edit Course
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${data.id}`}>
                <EyeIcon />
                Preview Course
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Trash2Icon />
              Delete Course
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Image
        src={thumbnailUrl}
        alt="Thumbnail Image"
        width={600}
        height={400}
        className="aspect-video h-full w-full rounded-t-lg object-cover"
      />

      <CardContent className="p-4">
        <Link
          href={`/admin/courses/${data.id}`}
          className="group-hover:text-primary line-clamp-2 w-fit text-lg font-medium transition-colors hover:underline"
        >
          {data.title}
        </Link>

        <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-tight">
          {data.smallDescription}
        </p>

        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <TimerIcon className="text-primary bg-primary/10 size-6 rounded-md p-1" />
            <p className="text-muted-foreground text-sm">
              {data.duration} hours
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <SchoolIcon className="text-primary bg-primary/10 size-6 rounded-md p-1" />
            <p className="text-muted-foreground text-sm">{data.level}</p>
          </div>
        </div>

        <Button asChild className="mt-4 w-full">
          <Link href={`/admin/courses/${data.id}/edit`}>
            Edit Course
            <PencilLineIcon />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
