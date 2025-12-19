import { Ionicons } from "@expo/vector-icons";

import { PlaceholderScreen } from "~/components/placeholder-screen";

export default function HelpScreen() {
  return (
    <PlaceholderScreen
      title="Help"
      description="Get help and support"
      icon={<Ionicons name="help-circle" size={64} color="#3b82f6" />}
    />
  );
}
