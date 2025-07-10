"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { SplittingText } from "@/components/animate-ui/text/splitting";
import { AnimatedCardGrid } from "@/components/animate-ui/grid/card-grid";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Developer",
    company: "Tech Innovations Inc.",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    quote:
      "The AI-powered learning paths helped me transition from marketing to software development in just 8 months. The personalized feedback was incredible!",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Data Scientist",
    company: "Analytics Pro",
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    quote:
      "I've tried many online platforms, but this one stands out. The interactive projects and real-world applications made all the difference.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "UX Designer",
    company: "Creative Studios",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    quote:
      "The community aspect is amazing. I connected with mentors and peers who helped me land my dream job. Highly recommended!",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Product Manager",
    company: "StartupXYZ",
    avatar:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    quote:
      "The flexibility to learn at my own pace while working full-time was exactly what I needed. The certificates opened new career opportunities.",
    rating: 5,
  },
  {
    name: "Lisa Thompson",
    role: "Marketing Specialist",
    company: "Digital Agency",
    avatar:
      "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    quote:
      "The quality of instruction is top-notch. I gained practical skills that I could immediately apply in my current role.",
    rating: 5,
  },
  {
    name: "Alex Rivera",
    role: "Cybersecurity Analyst",
    company: "SecureNet",
    avatar:
      "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    quote:
      "The hands-on labs and real-world scenarios prepared me for actual challenges in cybersecurity. Excellent platform!",
    rating: 5,
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto">
        <div className="mb-16 flex flex-col items-center space-y-8 text-center">
          <SplittingText
            className="text-foreground mb-4 text-3xl font-bold"
            text="What Our Students Say"
            type="words"
          />
          <SplittingText
            className="text-muted-foreground mx-auto max-w-[600px]"
            text="Join thousands of successful learners who have transformed their careers with our platform."
            delay={500}
            type="words"
          />
        </div>

        <AnimatedCardGrid
          delay={1000}
          className="grid grid-cols-1 gap-4 lg:grid-cols-3"
        >
          {testimonials.map((testimonial, idx) => (
            <Card
              key={idx}
              className="bg-background dark:bg-card relative h-54 overflow-hidden border transition-all duration-300 hover:shadow-lg"
            >
              <CardContent>
                <div className="text-muted-foreground/20 absolute top-4 right-4">
                  <Quote className="size-8" />
                </div>

                <div className="mb-4 flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="mr-4 h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-foreground font-semibold">
                      {testimonial.name}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {testimonial.role}
                    </p>
                    <p className="text-muted-foreground/80 text-xs">
                      {testimonial.company}
                    </p>
                  </div>
                </div>

                <div className="mb-4 flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="fill-primary text-primary h-4 w-4"
                    />
                  ))}
                </div>

                <blockquote className="text-muted-foreground text-sm leading-relaxed italic">
                  "{testimonial.quote}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </AnimatedCardGrid>
      </div>
    </section>
  );
};
