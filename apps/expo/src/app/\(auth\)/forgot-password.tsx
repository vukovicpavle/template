import { Ionicons } from "@expo/vector-icons";

import { PlaceholderScreen } from "~/components/placeholder-screen";

export default function ForgotPasswordScreen() {
  return (
    <PlaceholderScreen
      title="Forgot Password"
      description="Reset your password"
      icon={<Ionicons name="key" size={64} color="#3b82f6" />}
    />
  );
}
