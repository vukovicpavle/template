import { Ionicons } from "@expo/vector-icons";

import { PlaceholderScreen } from "~/components/placeholder-screen";

export default function LanguageSelectionScreen() {
  return (
    <PlaceholderScreen
      title="Language Selection"
      description="Choose your preferred language"
      icon={<Ionicons name="language" size={64} color="#3b82f6" />}
    />
  );
}
