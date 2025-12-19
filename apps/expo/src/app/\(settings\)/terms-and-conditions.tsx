import { Ionicons } from "@expo/vector-icons";

import { PlaceholderScreen } from "~/components/placeholder-screen";

export default function TermsAndConditionsSettingsScreen() {
  return (
    <PlaceholderScreen
      title="Terms and Conditions"
      description="Terms of service and usage guidelines"
      icon={<Ionicons name="document-text" size={64} color="#3b82f6" />}
    />
  );
}
