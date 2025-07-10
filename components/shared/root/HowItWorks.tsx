"use client";

import React from "react";
import { motion } from "framer-motion";
import { UserPlus, BookOpen, TrendingUp } from "lucide-react";
import { SplittingText } from "@/components/animate-ui/text/splitting";
import { AnimatedCardGrid } from "@/components/animate-ui/grid/card-grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Account",
    description:
      "Sign up in seconds and tell us about your learning goals and interests.",
    step: "01",
  },
  {
    icon: BookOpen,
    title: "Choose Your Path",
    description:
      "Browse our curated courses or let our AI recommend the perfect learning journey.",
    step: "02",
  },
  {
    icon: TrendingUp,
    title: "Learn & Practice",
    description:
      "Engage with interactive content, complete projects, and track your progress.",
    step: "03",
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="mb-16 flex flex-col items-center space-y-8 text-center">
          <SplittingText
            className="mb-4 text-3xl font-bold"
            text="How It Works"
            type="words"
          />
          <SplittingText
            className="mx-auto max-w-[600px]"
            text="Get started with our platform in just four simple steps and begin your learning journey today."
            delay={1000}
            type="words"
          />
        </div>

        <AnimatedCardGrid
          delay={1000}
          className="grid grid-cols-1 gap-4 lg:grid-cols-3"
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={idx}
                className="relative"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-background dark:bg-card h-48 transition-shadow hover:shadow-2xl">
                  <CardHeader className="flex flex-row items-center space-x-2">
                    <Icon className="text-primary size-8" />
                    <CardTitle className="text-primary text-2xl">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatedCardGrid>
      </div>
    </section>
  );
};
