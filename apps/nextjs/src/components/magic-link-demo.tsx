"use client";

import { useState } from "react";
import { HiEnvelope, HiCheckCircle } from "react-icons/hi2";

import { Button } from "@acme/ui/button";
import { Input } from "@acme/ui/input";
import { toast } from "@acme/ui/toast";

import { authClient } from "~/auth/client";

export function MagicLinkDemo() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();

    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    const isValidEmail = email && email.includes("@");
    if (!isValidEmail) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      await authClient.signIn.magicLink({
        email,
        callbackURL: "/",
      });

      setIsSent(true);
      toast.success(
        "Magic link sent! Check your email to complete sign in.",
      );
    } catch (error) {
      console.error("Magic link error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to send magic link. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-lg border border-green-200 bg-green-50 p-8 text-center dark:border-green-900 dark:bg-green-950">
        <HiCheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
        <h3 className="text-xl font-semibold text-green-900 dark:text-green-100">
          Check your email!
        </h3>
        <p className="text-sm text-green-700 dark:text-green-300">
          We've sent a magic link to <strong>{email}</strong>. Click the link
          in the email to sign in.
        </p>
        <Button
          onClick={() => {
            setIsSent(false);
            setEmail("");
          }}
          variant="outline"
          className="mt-4"
        >
          Send another link
        </Button>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-4 rounded-lg border bg-card p-8 shadow-sm">
      <div className="flex flex-col gap-2 text-center">
        <HiEnvelope className="mx-auto h-12 w-12 text-purple-600 dark:text-purple-400" />
        <h2 className="text-2xl font-bold">Sign in with Magic Link</h2>
        <p className="text-sm text-muted-foreground">
          Enter your email and we'll send you a secure link to sign in
        </p>
      </div>

      <form onSubmit={handleSendMagicLink} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
            className="w-full"
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Sending..." : "Send Magic Link"}
        </Button>
      </form>

      <p className="text-xs text-muted-foreground text-center">
        By signing in, you agree to receive emails from us. The link will
        expire in 5 minutes.
      </p>
    </div>
  );
}
