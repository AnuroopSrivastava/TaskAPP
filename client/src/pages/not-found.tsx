import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen pb-noise pb-grid flex items-center justify-center px-4">
      <Card className="pb-glass pb-ring w-full max-w-lg rounded-3xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-200" />
            <h1 className="pb-title text-2xl" data-testid="text-404-title">
              404
            </h1>
          </div>
          <p className="text-sm text-muted-foreground" data-testid="text-404-subtitle">
            This page doesn’t exist.
          </p>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground" data-testid="text-404-hint">
            Head back to the auth flow.
          </p>
          <Button asChild data-testid="button-404-home">
            <Link href="/auth">Go to login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
