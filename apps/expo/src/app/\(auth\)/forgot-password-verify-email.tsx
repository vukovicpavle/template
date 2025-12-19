import { Ionicons } from "@expo/vector-icons";

import { PlaceholderScreen } from "~/components/placeholder-screen";

export default function ForgotPasswordVerifyEmailScreen() {
  return (
    <PlaceholderScreen
      title="Verify Email"
      description="Verify your email to reset password"
      icon={<Ionicons name="mail" size={64} color="#3b82f6" />}
    />
  );
}
