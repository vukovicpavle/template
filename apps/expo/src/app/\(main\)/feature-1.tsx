import { Ionicons } from "@expo/vector-icons";

import { PlaceholderScreen } from "~/components/placeholder-screen";

export default function Feature1Screen() {
  return (
    <PlaceholderScreen
      title="Feature 1"
      description="First main feature of the app"
      icon={<Ionicons name="star" size={64} color="#3b82f6" />}
    />
  );
}
