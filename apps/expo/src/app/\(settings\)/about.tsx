import { Ionicons } from "@expo/vector-icons";

import { PlaceholderScreen } from "~/components/placeholder-screen";

export default function AboutScreen() {
  return (
    <PlaceholderScreen
      title="About"
      description="App information and version"
      icon={<Ionicons name="information-circle" size={64} color="#3b82f6" />}
    />
  );
}
