"use client";

import * as React from "react";
import { motion, useInView, type Variants } from "framer-motion";

interface AnimatedCardGridProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    y: -150,
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export const AnimatedCardGrid: React.FC<AnimatedCardGridProps> = ({
  children,
  delay = 0,
  className,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{
            y: -5,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
          transition={{ type: "spring", stiffness: 100 }}
          className="rounded-lg"
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};
