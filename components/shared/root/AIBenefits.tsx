"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Brain,
  Target,
  MessageSquare,
  TrendingUp,
  Lightbulb,
  Users,
  Sparkles,
  Zap,
  TvMinimalPlayIcon,
  RocketIcon,
} from "lucide-react";
import { SplittingText } from "@/components/animate-ui/text/splitting";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { Button } from "@/components/ui/button";

// Animated background components for each benefit
const PersonalizationBackground = () => (
  <div className="from-primary/5 to-primary/10 absolute inset-0 bg-gradient-to-br">
    <div className="bg-primary/10 absolute top-4 right-4 h-32 w-32 animate-pulse rounded-full blur-xl" />
    <div className="bg-primary/5 absolute bottom-8 left-8 h-24 w-24 animate-pulse rounded-full blur-lg delay-1000" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
      <Sparkles
        className="text-primary/20 h-16 w-16 animate-spin"
        style={{ animationDuration: "8s" }}
      />
    </div>
  </div>
);

const FeedbackBackground = () => (
  <div className="from-primary/5 to-muted/20 absolute inset-0 bg-gradient-to-tr">
    <div className="bg-primary/30 absolute top-8 left-8 h-4 w-4 animate-bounce rounded-full" />
    <div className="bg-primary/20 absolute top-16 right-12 h-3 w-3 animate-bounce rounded-full delay-300" />
    <div className="bg-primary/40 absolute bottom-12 left-16 h-2 w-2 animate-bounce rounded-full delay-700" />
    <div className="bg-primary/10 absolute right-8 bottom-8 h-6 w-6 animate-pulse rounded-full" />
  </div>
);

const AdaptiveBackground = () => (
  <div className="from-primary/10 to-muted/10 absolute inset-0 bg-gradient-to-bl">
    <div className="absolute inset-0 opacity-30">
      <div className="bg-primary/40 absolute top-4 left-4 h-1 w-8 animate-pulse rounded" />
      <div className="bg-primary/30 absolute top-8 left-8 h-1 w-12 animate-pulse rounded delay-200" />
      <div className="bg-primary/50 absolute top-12 left-6 h-1 w-6 animate-pulse rounded delay-400" />
      <div className="bg-primary/20 absolute top-16 left-10 h-1 w-10 animate-pulse rounded delay-600" />
    </div>
  </div>
);

const AnalyticsBackground = () => (
  <div className="from-primary/5 to-primary/15 absolute inset-0 bg-gradient-to-tr">
    <div className="absolute right-4 bottom-4 left-4 h-24 opacity-20">
      <div className="flex h-full items-end justify-between">
        <div
          className="bg-primary/60 w-4 animate-pulse rounded-t"
          style={{ height: "40%" }}
        />
        <div
          className="bg-primary/40 w-4 animate-pulse rounded-t delay-100"
          style={{ height: "70%" }}
        />
        <div
          className="bg-primary/80 w-4 animate-pulse rounded-t delay-200"
          style={{ height: "90%" }}
        />
        <div
          className="bg-primary/30 w-4 animate-pulse rounded-t delay-300"
          style={{ height: "50%" }}
        />
        <div
          className="bg-primary/70 w-4 animate-pulse rounded-t delay-400"
          style={{ height: "80%" }}
        />
      </div>
    </div>
  </div>
);

const DiscoveryBackground = () => (
  <div className="from-primary/8 to-muted/15 absolute inset-0 bg-gradient-to-br">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
      <div className="relative">
        <div
          className="border-primary/20 h-16 w-16 animate-spin rounded-full border-2"
          style={{ animationDuration: "10s" }}
        />
        <div
          className="border-primary/30 absolute top-2 left-2 h-12 w-12 animate-spin rounded-full border"
          style={{ animationDuration: "8s", animationDirection: "reverse" }}
        />
        <div className="bg-primary/10 absolute top-4 left-4 h-8 w-8 animate-pulse rounded-full" />
      </div>
    </div>
  </div>
);

const PeerMatchingBackground = () => (
  <div className="from-primary/5 to-primary/12 absolute inset-0 bg-gradient-to-tl">
    <div className="bg-primary/20 absolute top-8 left-8 h-8 w-8 rounded-full" />
    <div className="bg-primary/30 absolute top-12 right-12 h-6 w-6 rounded-full" />
    <div className="bg-primary/15 absolute bottom-16 left-16 h-10 w-10 rounded-full" />
    <div className="bg-primary/40 absolute right-8 bottom-8 h-4 w-4 rounded-full" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
      <Users className="text-primary/20 h-12 w-12" />
    </div>
  </div>
);

const benefits = [
  {
    Icon: Brain,
    name: "Intelligent Personalization",
    description:
      "AI analyzes your learning style, pace, and preferences to create a completely personalized curriculum that adapts as you grow.",
    className: "col-span-3 lg:col-span-2",
    background: <PersonalizationBackground />,
    href: "/features/personalization",
    cta: "Learn more",
  },
  {
    Icon: MessageSquare,
    name: "Smart Feedback",
    description:
      "Get instant, contextual feedback with AI-powered suggestions for improvement.",
    className: "col-span-3 lg:col-span-1",
    background: <FeedbackBackground />,
    href: "/features/feedback",
    cta: "Explore",
  },
  {
    Icon: Target,
    name: "Adaptive Paths",
    description:
      "Dynamic course recommendations that evolve based on your progress and goals.",
    className: "col-span-3 lg:col-span-1",
    background: <AdaptiveBackground />,
    href: "/features/adaptive-learning",
    cta: "Discover",
  },
  {
    Icon: TrendingUp,
    name: "Performance Analytics",
    description:
      "Advanced insights into your learning patterns with predictive analytics and detailed progress tracking.",
    className: "col-span-3 lg:col-span-2",
    background: <AnalyticsBackground />,
    href: "/features/analytics",
    cta: "View insights",
  },
  {
    Icon: Lightbulb,
    name: "Content Discovery",
    description:
      "AI-powered recommendations that surface relevant materials from our vast library.",
    className: "col-span-3 lg:col-span-2",
    background: <DiscoveryBackground />,
    href: "/features/discovery",
    cta: "Explore content",
  },
  {
    Icon: Users,
    name: "Smart Peer Matching",
    description:
      "Connect with study partners and mentors who complement your learning style.",
    className: "col-span-3 lg:col-span-1",
    background: <PeerMatchingBackground />,
    href: "/features/community",
    cta: "Connect",
  },
];

export const AIBenefits: React.FC = () => {
  return (
    <section className="bg-muted/50 relative container mb-20 overflow-hidden rounded-lg py-20">
      <div className="relative mx-auto px-4">
        <div className="mb-16 flex flex-col items-center space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-primary/10 mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 backdrop-blur-sm"
          >
            <Brain className="text-primary size-5" />
            <span className="text-primary text-sm font-medium">
              Powered by Advanced AI
            </span>
          </motion.div>

          <SplittingText
            className="text-foreground mb-4 text-3xl font-bold"
            text="Experience the Future of Learning"
            type="words"
          />
          <SplittingText
            className="text-muted-foreground mx-auto max-w-[700px] text-lg"
            text="Our AI-powered platform doesn't just deliver content—it understands how you learn and adapts to help you achieve your goals faster than ever before."
            delay={500}
            type="words"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <BentoGrid className="mx-auto max-w-7xl">
            {benefits.map((benefit, idx) => (
              <BentoCard key={idx} {...benefit} />
            ))}
          </BentoGrid>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-primary/80 relative mx-auto max-w-7xl overflow-hidden rounded-xl p-8">
            {/* Background decoration */}
            <div className="bg-primary-foreground/5 absolute top-4 right-4 h-32 w-32 rounded-full blur-2xl" />
            <div className="bg-primary-foreground/10 absolute bottom-4 left-4 h-24 w-24 rounded-full blur-xl" />

            <div className="relative z-10">
              <div className="mb-4 flex items-center justify-center gap-2">
                <Zap className="text-primary-foreground h-6 w-6" />
                <h3 className="text-primary-foreground text-2xl font-bold">
                  Ready to Experience AI-Powered Learning?
                </h3>
              </div>
              <p className="text-primary-foreground/80 mx-auto mb-6 max-w-2xl">
                Join thousands of learners who are already benefiting from our
                intelligent learning platform. Start your personalized journey
                today.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/sign-up">
                    Start Free Trial
                    <RocketIcon className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="default"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  <Link href="/demo">
                    Watch Demo
                    <TvMinimalPlayIcon className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
