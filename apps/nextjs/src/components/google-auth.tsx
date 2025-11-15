"use client";

import { FaGoogle } from "react-icons/fa";

import { Button } from "@acme/ui/button";

import { authClient } from "~/auth/client";

export function GoogleSignInButton() {
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <Button
      onClick={handleGoogleSignIn}
      variant="outline"
      className="w-full gap-2"
    >
      <FaGoogle className="h-5 w-5" />
      Sign in with Google
    </Button>
  );
}
