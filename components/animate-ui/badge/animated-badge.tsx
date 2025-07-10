"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface AnimatedBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "secondary";
  className?: string;
  delay?: number;
}

export const AnimatedBadge: React.FC<AnimatedBadgeProps> = ({
  children,
  variant = "outline",
  className,
  delay = 0,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{
        y: -30,
        opacity: 0,
        scale: 0.8,
        rotateX: -15,
      }}
      animate={
        isInView
          ? {
              y: 0,
              opacity: 1,
              scale: 1,
              rotateX: 0,
            }
          : {}
      }
      transition={{
        duration: 0.8,
        delay: delay / 1000,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{
        scale: 1.05,
        y: -2,
        transition: { duration: 0.2 },
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1 },
      }}
    >
      <Badge variant={variant} className={className}>
        {children}
      </Badge>
    </motion.div>
  );
};
