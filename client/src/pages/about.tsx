import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Github, Instagram, Linkedin, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const easeGlass = [0.2, 0.8, 0.2, 1] as const;

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: easeGlass },
  },
};

function Bullet({ children, testId }: { children: React.ReactNode; testId: string }) {
  return (
    <li className="flex gap-3" data-testid={testId}>
      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[hsl(200_92%_58%)] shadow-[0_0_0_6px_hsl(200_92%_58%_/_0.10)]" />
      <span className="text-sm leading-6 text-muted-foreground">{children}</span>
    </li>
  );
}

function SocialLink({
  href,
  icon,
  label,
  testId,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  testId: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "group inline-flex items-center gap-2 rounded-xl border border-border/70 bg-black/10 px-3 py-2 text-sm text-muted-foreground transition-colors",
        "hover:bg-black/15 hover:text-foreground"
      )}
      data-testid={testId}
    >
      <span className="text-[hsl(258_90%_66%)] group-hover:text-[hsl(200_92%_58%)] transition-colors">
        {icon}
      </span>
      <span>{label}</span>
    </a>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-noise pb-grid">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <motion.div variants={item} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/40 px-3 py-1 text-xs text-muted-foreground shadow">
                <Sparkles className="h-3.5 w-3.5 text-[hsl(200_92%_58%)]" />
                <span data-testid="text-about-tag">ABOUT</span>
              </div>
              <div className="hidden sm:block text-xs text-muted-foreground" data-testid="text-about-brand">
                Pulseboard
              </div>
            </div>

            <Button asChild variant="outline" className="bg-card/40" data-testid="button-back">
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>
          </motion.div>

          <motion.div variants={item} className="pb-glass pb-ring rounded-3xl p-6 md:p-8">
            <h1
              className="pb-title text-balance text-4xl leading-[1.02] tracking-tight md:text-6xl"
              data-testid="text-about-title"
            >
              About this project,
              <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,hsl(258_90%_66%),hsl(200_92%_58%))]">
                {" "}and the mind behind it.
              </span>
            </h1>
            <p
              className="mt-4 max-w-3xl text-pretty text-sm leading-6 text-muted-foreground md:text-base"
              data-testid="text-about-subtitle"
            >
              Pulseboard is a design-first frontend prototype built for a modern auth + dashboard
              assignment. The focus is on responsiveness, validation, error states, and micro-motion
              that feels deliberate—not distracting.
            </p>
          </motion.div>

          <motion.div variants={item} className="grid grid-cols-1 gap-4 md:grid-cols-12">
            <Card className="pb-glass pb-ring rounded-3xl md:col-span-7">
              <CardHeader className="space-y-1">
                <div className="pb-title text-xl" data-testid="text-about-website-title">
                  About This Website
                </div>
                <p className="text-sm text-muted-foreground" data-testid="text-about-website-desc">
                  A small, polished UI system showcasing key frontend fundamentals.
                </p>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-sm leading-6 text-muted-foreground" data-testid="text-about-website-body">
                  The goal of this prototype is simple: deliver a clean, modern interface with
                  thoughtful hierarchy, smooth transitions, and clear feedback at every step.
                </p>

                <ul className="space-y-3" data-testid="list-about-goals">
                  <Bullet testId="bullet-goal-1">A sleek auth experience with client-side validation.</Bullet>
                  <Bullet testId="bullet-goal-2">Clear loading, success, and error states—100% readable.</Bullet>
                  <Bullet testId="bullet-goal-3">A dashboard UI with search + filters and CRUD interactions.</Bullet>
                  <Bullet testId="bullet-goal-4">A cohesive theme: glass surfaces, glow accents, and soft depth.</Bullet>
                  <Bullet testId="bullet-goal-5">Responsive layout that still feels premium on mobile.</Bullet>
                </ul>

                <div
                  className="rounded-2xl border border-border/70 bg-black/10 p-4"
                  data-testid="card-about-note"
                >
                  <div className="text-xs text-muted-foreground" data-testid="text-about-note-title">
                    Note
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground" data-testid="text-about-note-body">
                    This build is a frontend-only prototype. The UI simulates login, profile update,
                    and task CRUD in memory for fast iteration.
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="pb-glass pb-ring rounded-3xl md:col-span-5">
              <CardHeader className="space-y-1">
                <div className="pb-title text-xl" data-testid="text-about-me-title">
                  About Me — Anuroop Srivastava
                </div>
                <p className="text-sm text-muted-foreground" data-testid="text-about-me-desc">
                  Full-Stack Web Developer & AI / ML Enthusiast
                </p>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-black/10">
                  <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_30%_20%,hsl(258_90%_66%_/_0.18),transparent_60%)]" />
                  <img
                    src="/anuroop.jpg"
                    alt="Portrait"
                    className="relative aspect-[4/5] w-full object-cover grayscale"
                    data-testid="img-profile"
                    loading="lazy"
                  />
                </div>

                <p className="text-sm leading-6 text-muted-foreground" data-testid="text-about-me-body">
                  Hi! I’m Anuroop Srivastava, a passionate and dedicated Full-Stack Web Developer &
                  AI/ML Enthusiast from India. I enjoy building fast, modern, and visually appealing
                  web applications while exploring the latest advancements in machine learning and
                  artificial intelligence.
                </p>

                <div className="space-y-2">
                  <div className="pb-title text-base" data-testid="text-about-vision-title">
                    My Vision
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground" data-testid="text-about-vision-body">
                    I believe in building technology that makes life simpler, smarter, and accessible.
                    This project is a step toward creating experiences that are clear, quick, and
                    genuinely enjoyable to use.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2" data-testid="group-social-links">
                  <SocialLink
                    href="https://www.linkedin.com/in/anuroopsrivastava/"
                    icon={<Linkedin className="h-4 w-4" />}
                    label="LinkedIn"
                    testId="link-linkedin"
                  />
                  <SocialLink
                    href="https://www.instagram.com/anuroop.srivastava/"
                    icon={<Instagram className="h-4 w-4" />}
                    label="Instagram"
                    testId="link-instagram"
                  />
                  <SocialLink
                    href="https://github.com/AnuroopSrivastava"
                    icon={<Github className="h-4 w-4" />}
                    label="GitHub"
                    testId="link-github"
                  />
                </div>

                <div
                  className="rounded-2xl border border-border/70 bg-black/10 p-4"
                  data-testid="card-about-footer"
                >
                  <div className="pb-title" data-testid="text-about-name">
                    Anuroop Srivastava
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground" data-testid="text-about-role">
                    Full-Stack Web Developer & AI / ML Enthusiast
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
