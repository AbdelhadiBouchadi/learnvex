"use client";

import * as React from "react";
import { motion, useInView, type Variants } from "framer-motion";

interface AnimatedButtonGroupProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    x: 150,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export const AnimatedButtonGroup: React.FC<AnimatedButtonGroupProps> = ({
  children,
  delay = 0,
  className,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

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
          style={{ display: "inline-block" }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};
