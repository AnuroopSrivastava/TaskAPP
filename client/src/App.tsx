import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import NotFound from "@/pages/not-found";
import AuthPage from "./pages/auth";
import DashboardPage from "./pages/dashboard";
import AboutPage from "./pages/about";

function PageTransition({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/">
        <PageTransition>
          <AuthPage />
        </PageTransition>
      </Route>
      <Route path="/auth">
        <PageTransition>
          <AuthPage />
        </PageTransition>
      </Route>
      <Route path="/dashboard">
        <PageTransition>
          <DashboardPage />
        </PageTransition>
      </Route>
      <Route path="/about">
        <PageTransition>
          <AboutPage />
        </PageTransition>
      </Route>
      <Route>
        <PageTransition>
          <NotFound />
        </PageTransition>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
