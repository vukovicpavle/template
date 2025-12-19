import { Ionicons } from "@expo/vector-icons";

import { PlaceholderScreen } from "~/components/placeholder-screen";

export default function Feature2Screen() {
  return (
    <PlaceholderScreen
      title="Feature 2"
      description="Second main feature of the app"
      icon={<Ionicons name="heart" size={64} color="#3b82f6" />}
    />
  );
}
