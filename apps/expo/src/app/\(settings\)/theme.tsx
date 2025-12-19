import { Ionicons } from "@expo/vector-icons";

import { PlaceholderScreen } from "~/components/placeholder-screen";

export default function ThemeScreen() {
  return (
    <PlaceholderScreen
      title="Theme"
      description="Choose your preferred theme"
      icon={<Ionicons name="color-palette" size={64} color="#3b82f6" />}
    />
  );
}
