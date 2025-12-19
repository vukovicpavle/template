import { Ionicons } from "@expo/vector-icons";

import { PlaceholderScreen } from "~/components/placeholder-screen";

export default function RegisterVerifyEmailScreen() {
  return (
    <PlaceholderScreen
      title="Verify Email"
      description="Verify your email address to complete registration"
      icon={<Ionicons name="mail" size={64} color="#3b82f6" />}
    />
  );
}
