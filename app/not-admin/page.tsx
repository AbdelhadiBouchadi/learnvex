import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeftIcon, ShieldXIcon } from "lucide-react";
import Link from "next/link";

export default function NotAdminRoute() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="bg-destructive/10 mx-auto w-fit rounded-full p-4">
            <ShieldXIcon className="text-destructive size-16" />
          </div>
          <CardTitle className="mt-4 text-2xl">Access Restricted</CardTitle>
          <CardDescription className="mx-auto max-w-xs">
            You are not an admin . Only admin can perform such an action.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="group w-full">
            <Link href="/">
              <ArrowLeftIcon className="transition-transform duration-200 group-hover:-translate-x-2" />
              Back To Home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
