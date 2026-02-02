import * as React from "react";
import { Link } from "wouter";
import { motion, type Variants } from "framer-motion";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, ShieldCheck, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email");

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Add at least 1 uppercase letter")
  .regex(/[0-9]/, "Add at least 1 number");

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type LoginValues = z.infer<typeof loginSchema>;
type SignupValues = z.infer<typeof signupSchema>;

const easeGlass = [0.2, 0.8, 0.2, 1] as const;

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
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

function FieldGlow({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute -inset-10 opacity-70 blur-2xl",
        className
      )}
      aria-hidden
    >
      <div className="h-full w-full rounded-[28px] bg-[radial-gradient(closest-side,hsl(258_90%_66%_/_0.26),transparent_70%)]" />
    </div>
  );
}

export default function AuthPage() {
  const { toast } = useToast();
  const [tab, setTab] = React.useState<"login" | "signup">("login");
  const [showPw, setShowPw] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  const signupForm = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    mode: "onTouched",
  });

  async function fakeRequest() {
    setBusy(true);
    setServerError(null);
    await new Promise((r) => setTimeout(r, 750));
    setBusy(false);
  }

  async function onLogin(values: LoginValues) {
    await fakeRequest();
    if (values.email.toLowerCase().includes("fail")) {
      setServerError("Invalid email or password.");
      return;
    }
    toast({
      title: "Welcome back",
      description: "Signed in successfully (mock).",
    });
    window.location.href = "/dashboard";
  }

  async function onSignup(values: SignupValues) {
    await fakeRequest();
    if (values.email.toLowerCase().includes("taken")) {
      setServerError("That email is already in use.");
      return;
    }
    toast({
      title: "Account created",
      description: "You can now sign in (mock).",
    });
    setTab("login");
    loginForm.setValue("email", values.email);
    loginForm.setValue("password", "");
  }

  return (
    <div className="min-h-screen pb-noise pb-grid">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-10 md:px-6">
        <motion.div
          className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 md:items-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div className="relative" variants={item}>
            <div className="absolute -top-10 left-0 h-36 w-36 rounded-full bg-[radial-gradient(circle_at_30%_30%,hsl(200_92%_58%_/_0.30),transparent_60%)] blur-2xl" />
            <div className="absolute -bottom-10 right-0 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_30%_30%,hsl(258_90%_66%_/_0.28),transparent_60%)] blur-2xl" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/40 px-3 py-1 text-xs text-muted-foreground shadow">
                <Sparkles className="h-3.5 w-3.5 text-[hsl(200_92%_58%)]" />
                <span data-testid="text-auth-tagline">Smooth auth + dashboard prototype</span>
              </div>

              <h1
                className="pb-title mt-5 text-balance text-4xl leading-[1.02] tracking-tight md:text-6xl"
                data-testid="text-auth-title"
              >
                Build trust in the first 10 seconds.
              </h1>

              <p
                className="mt-4 max-w-lg text-pretty text-sm leading-6 text-muted-foreground md:text-base"
                data-testid="text-auth-subtitle"
              >
                Pulseboard is a crafted UI playground for auth, protected routes, and
                dashboard CRUD—designed for speed, clarity, and delightful motion.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-card/40 px-3 py-2 text-sm">
                  <ShieldCheck className="h-4 w-4 text-[hsl(258_90%_66%)]" />
                  <span className="text-muted-foreground" data-testid="text-auth-badge">
                    Validation, states, micro-interactions
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-card/40 px-3 py-2 text-sm">
                  <span className="h-2 w-2 rounded-full bg-[hsl(200_92%_58%)]" />
                  <span className="text-muted-foreground" data-testid="text-auth-badge-2">
                    Dark glass + glow system
                  </span>
                </div>
              </div>

              <div className="mt-8 text-xs text-muted-foreground">
                <span data-testid="text-auth-hint">
                  Tip: try an email containing “fail” to see a server error state.
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div className="relative" variants={item}>
            <FieldGlow />
            <Card className="pb-glass pb-ring overflow-hidden">
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="pb-title text-2xl" data-testid="text-auth-card-title">
                      {tab === "login" ? "Welcome back" : "Create your account"}
                    </div>
                    <div
                      className="mt-1 text-sm text-muted-foreground"
                      data-testid="text-auth-card-desc"
                    >
                      {tab === "login"
                        ? "Sign in to access your dashboard."
                        : "Start with a clean, secure foundation."}
                    </div>
                  </div>
                  <div className="hidden sm:block text-xs text-muted-foreground">
                    <span data-testid="text-auth-brand">Pulseboard</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <Tabs
                  value={tab}
                  onValueChange={(v) => setTab(v as any)}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2" data-testid="tabs-auth">
                    <TabsTrigger value="login" data-testid="tab-login">
                      Login
                    </TabsTrigger>
                    <TabsTrigger value="signup" data-testid="tab-signup">
                      Sign up
                    </TabsTrigger>
                  </TabsList>

                  {serverError ? (
                    <div
                      className="mt-4 rounded-xl border border-destructive/40 bg-[hsl(0_84%_60%_/_0.08)] px-3 py-2 text-sm text-red-200"
                      data-testid="status-auth-error"
                      role="alert"
                    >
                      {serverError}
                    </div>
                  ) : null}

                  <TabsContent value="login" className="mt-5">
                    <Form {...loginForm}>
                      <form
                        onSubmit={loginForm.handleSubmit(onLogin)}
                        className="space-y-4"
                      >
                        <FormField
                          control={loginForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel data-testid="label-email">Email</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="you@company.com"
                                  className="bg-black/20"
                                  data-testid="input-email"
                                />
                              </FormControl>
                              <FormMessage data-testid="error-email" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel data-testid="label-password">Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    {...field}
                                    type={showPw ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="bg-black/20 pr-10"
                                    data-testid="input-password"
                                  />
                                  <button
                                    type="button"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
                                    onClick={() => setShowPw((s) => !s)}
                                    data-testid="button-toggle-password"
                                    aria-label={showPw ? "Hide password" : "Show password"}
                                  >
                                    {showPw ? (
                                      <EyeOff className="h-4 w-4" />
                                    ) : (
                                      <Eye className="h-4 w-4" />
                                    )}
                                  </button>
                                </div>
                              </FormControl>
                              <FormMessage data-testid="error-password" />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          className="w-full"
                          disabled={busy}
                          data-testid="button-login"
                        >
                          {busy ? "Signing in…" : "Sign in"}
                        </Button>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span data-testid="text-legal">
                            By continuing, you agree to our terms.
                          </span>
                          <Link
                            href="/dashboard"
                            className="transition-colors hover:text-foreground"
                            data-testid="link-skip"
                          >
                            Skip
                          </Link>
                        </div>
                      </form>
                    </Form>
                  </TabsContent>

                  <TabsContent value="signup" className="mt-5">
                    <Form {...signupForm}>
                      <form
                        onSubmit={signupForm.handleSubmit(onSignup)}
                        className="space-y-4"
                      >
                        <FormField
                          control={signupForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel data-testid="label-name">Name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Your name"
                                  className="bg-black/20"
                                  data-testid="input-name"
                                />
                              </FormControl>
                              <FormMessage data-testid="error-name" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={signupForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel data-testid="label-email-signup">Email</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="you@company.com"
                                  className="bg-black/20"
                                  data-testid="input-email-signup"
                                />
                              </FormControl>
                              <FormMessage data-testid="error-email-signup" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={signupForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel data-testid="label-password-signup">
                                Password
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type={showPw ? "text" : "password"}
                                  placeholder="At least 8 chars, 1 uppercase, 1 number"
                                  className="bg-black/20"
                                  data-testid="input-password-signup"
                                />
                              </FormControl>
                              <FormMessage data-testid="error-password-signup" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={signupForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel data-testid="label-confirm-password">
                                Confirm password
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type={showPw ? "text" : "password"}
                                  placeholder="Repeat your password"
                                  className="bg-black/20"
                                  data-testid="input-confirm-password"
                                />
                              </FormControl>
                              <FormMessage data-testid="error-confirm-password" />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          className="w-full"
                          disabled={busy}
                          data-testid="button-signup"
                        >
                          {busy ? "Creating…" : "Create account"}
                        </Button>

                        <div className="text-xs text-muted-foreground">
                          <span data-testid="text-password-rules">
                            Password rules: 8+ chars, one uppercase letter, one number.
                          </span>
                        </div>
                      </form>
                    </Form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
