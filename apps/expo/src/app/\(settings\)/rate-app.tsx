import { Ionicons } from "@expo/vector-icons";

import { PlaceholderScreen } from "~/components/placeholder-screen";

export default function RateAppScreen() {
  return (
    <PlaceholderScreen
      title="Rate App"
      description="Rate us on the app store"
      icon={<Ionicons name="star" size={64} color="#f59e0b" />}
    />
  );
}
