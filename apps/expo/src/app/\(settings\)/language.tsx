import { Ionicons } from "@expo/vector-icons";

import { PlaceholderScreen } from "~/components/placeholder-screen";

export default function LanguageSettingsScreen() {
  return (
    <PlaceholderScreen
      title="Language"
      description="Change app language"
      icon={<Ionicons name="language" size={64} color="#3b82f6" />}
    />
  );
}
