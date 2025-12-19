import { Ionicons } from "@expo/vector-icons";

import { PlaceholderScreen } from "~/components/placeholder-screen";

export default function PrivacyPolicyScreen() {
  return (
    <PlaceholderScreen
      title="Privacy Policy"
      description="Information about how we handle your data"
      icon={<Ionicons name="shield-checkmark" size={64} color="#3b82f6" />}
    />
  );
}
