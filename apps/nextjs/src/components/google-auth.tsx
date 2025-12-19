"use client";

import { FaGoogle } from "react-icons/fa";

import { Button } from "@acme/ui/button";

import { authClient } from "~/auth/client";

export function GoogleSignInButton() {
  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      // Log for debugging while avoiding exposing sensitive information to users
      console.error("Google sign-in failed", error);
      if (typeof window !== "undefined") {
        window.alert("Unable to sign in with Google. Please try again.");
      }
    }
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
