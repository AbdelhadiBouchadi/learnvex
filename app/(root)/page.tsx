import { AnimatedBadge } from "@/components/animate-ui/badge/animated-badge";
import { AnimatedButtonGroup } from "@/components/animate-ui/buttonGroup/button-group";
import { AnimatedCardGrid } from "@/components/animate-ui/grid/card-grid";
import { SplittingText } from "@/components/animate-ui/text/splitting";
import { AIBenefits } from "@/components/shared/root/AIBenefits";
import { HowItWorks } from "@/components/shared/root/HowItWorks";
import { Testimonials } from "@/components/shared/root/Testimonials";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { features } from "@/lib/data";
import { ArrowRightIcon, BookOpenIcon, LogInIcon } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <section className="relative py-20">
        <div className="flex flex-col items-center space-y-8 text-center">
          <AnimatedBadge
            variant="outline"
            delay={200}
            className="py-2 font-semibold"
          >
            The Future Of Online Education
          </AnimatedBadge>

          <SplittingText
            className="text-2xl font-bold tracking-tight md:text-4xl lg:text-6xl"
            text="Elevate Your Learning Experience"
            type="chars"
          />
          <SplittingText
            className="text-muted-foreground max-w-[700px] md:text-xl"
            text="Discover a new way to learn with our modern, interactive learning
            management system. Access high-quality courses anytime, anywhere."
            delay={1200}
            type="words"
          />
          <AnimatedButtonGroup
            className="mt-8 flex flex-col justify-center gap-4 sm:flex-row"
            delay={1200}
          >
            <Button asChild size="lg">
              <Link href="/courses">
                Explore Courses
                <BookOpenIcon className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/sign-up">
                Sign Up
                <LogInIcon className="ml-2 size-4" />
              </Link>
            </Button>
          </AnimatedButtonGroup>
        </div>
      </section>

      <AnimatedCardGrid
        className="mb-32 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        delay={1000}
      >
        {features.map((feature, idx) => {
          const Icon = feature.icon;

          return (
            <Card key={idx} className="min-h-48">
              <CardHeader className="flex flex-row items-center space-x-2">
                <Icon className="text-primary size-8" />
                <CardTitle className="text-primary text-2xl">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </AnimatedCardGrid>

      <HowItWorks />

      <Testimonials />

      <AIBenefits />

      {/* CTA Section */}

      <section className="pb-16 text-center">
        <div className="from-secondary to-primary dark:from-primary dark:to-secondary flex flex-col items-center space-y-8 rounded-lg bg-radial py-4 text-center">
          <SplittingText
            className="mb-4 text-3xl font-bold"
            text="Ready to Start Learning?"
            type="words"
          />
          <SplittingText
            className="text-muted-foreground mx-auto mb-8 max-w-[500px]"
            text="Join thousands of learners who have transformed their careers with our platform."
            delay={800}
            type="words"
          />
          <AnimatedButtonGroup delay={1500}>
            <Button asChild variant="outline">
              <Link href="/sign-up" className="group">
                Get Started Today
                <ArrowRightIcon className="ml-2 size-4 transition-transform duration-150 group-hover:translate-x-2" />
              </Link>
            </Button>
          </AnimatedButtonGroup>
        </div>
      </section>
    </>
  );
}
