import { Ionicons } from "@expo/vector-icons";

import { PlaceholderScreen } from "~/components/placeholder-screen";

export default function OnboardingScreen() {
  return (
    <PlaceholderScreen
      title="Onboarding"
      description="Welcome! Let's get you started"
      icon={<Ionicons name="book" size={64} color="#3b82f6" />}
    />
  );
}
