import { IconDashboard } from "@tabler/icons-react";
import {
  BarChart2Icon,
  BookOpenIcon,
  Gamepad2Icon,
  HomeIcon,
  LucideIcon,
  Tv2Icon,
  Users2Icon,
} from "lucide-react";

interface FeatureProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const features: FeatureProps[] = [
  {
    title: "Comprehensive Courses",
    description:
      "Access a wide range of carefully curated courses designed by industry experts.",
    icon: BookOpenIcon,
  },
  {
    title: "Interactive Learning",
    description:
      "Engage with interactive content, quizzes, and assignments to enhance your learning experience",
    icon: Gamepad2Icon,
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your progress and achievements with detailed analytics and personalized dashboards.",
    icon: BarChart2Icon,
  },
  {
    title: "Community Support",
    description:
      "Join a vibrant community of learners and instructors to collaborate and share knowledge",
    icon: Users2Icon,
  },
];

export const navItems = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    name: "Courses",
    href: "/courses",
    icon: Tv2Icon,
  },
  {
    name: "Dashboard",
    href: "/admin",
    icon: IconDashboard,
  },
];
