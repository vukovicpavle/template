import { Alert, Pressable, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { authClient } from "~/utils/auth";

export function GoogleSignInButton() {
  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Google sign-in failed", error);
      Alert.alert(
        "Sign-in failed",
        "Unable to sign in with Google. Please try again.",
      );
    }
  };

  return (
    <Pressable
      onPress={handleGoogleSignIn}
      className="flex-row items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-6 py-3 active:bg-gray-50"
    >
      <FontAwesome name="google" size={20} color="#4285F4" />
      <Text className="text-base font-semibold text-gray-700">
        Sign in with Google
      </Text>
    </Pressable>
  );
}
