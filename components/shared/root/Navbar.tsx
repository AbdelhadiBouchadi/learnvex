"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/public/logo.svg";
import { navItems } from "@/lib/data";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { authClient } from "@/lib/auth-client";
import { buttonVariants } from "@/components/ui/button";
import UserDropdown from "./UserDropdown";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LogInIcon } from "lucide-react";

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-background/95 backdrop-blur-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b"
    >
      <div className="container mx-auto flex min-h-16 items-center px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Link
            href="/"
            className="pointer-events-none mr-4 flex items-center space-x-2"
          >
            <Image src={Logo} alt="Logo Image" className="size-9" />
            <span className="font-bold">LearnVex</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:flex md:flex-1 md:items-center md:justify-between"
        >
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {navItems.map((link, index) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                const Icon = link.icon;

                return (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      href={link.href}
                      className={cn(
                        "text-foreground hover:text-primary group flex-row items-center gap-2 py-1.5 font-medium",
                        isActive && "bg-accent text-accent-foreground",
                      )}
                    >
                      <Icon
                        size={16}
                        className={cn(
                          "text-foreground group-hover:text-primary transition-colors",
                          isActive && "text-accent-foreground",
                        )}
                        aria-hidden="true"
                      />
                      <span className="group-hover:text-primary transition-colors">
                        {link.name}
                      </span>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-4">
            <ModeToggle />

            {isPending ? null : session ? (
              <UserDropdown
                email={session.user.email}
                name={session.user.name}
                image={session.user.image}
              />
            ) : (
              <Link
                href="/sign-in"
                className={buttonVariants({ variant: "secondary", size: "lg" })}
              >
                Sign In
                <LogInIcon className="ml-2 size-4" />
              </Link>
            )}
          </div>
        </motion.nav>
      </div>
    </motion.header>
  );
};

export default Navbar;
