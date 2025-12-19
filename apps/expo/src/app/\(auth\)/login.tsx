import { Ionicons } from "@expo/vector-icons";

import { PlaceholderScreen } from "~/components/placeholder-screen";

export default function LoginScreen() {
  return (
    <PlaceholderScreen
      title="Login"
      description="Sign in to your account"
      icon={<Ionicons name="log-in" size={64} color="#3b82f6" />}
    />
  );
}
