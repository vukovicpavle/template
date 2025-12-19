import { Ionicons } from "@expo/vector-icons";

import { PlaceholderScreen } from "~/components/placeholder-screen";

export default function HomeScreen() {
  return (
    <PlaceholderScreen
      title="Home"
      description="Main dashboard and overview"
      icon={<Ionicons name="home" size={64} color="#3b82f6" />}
    />
  );
}
