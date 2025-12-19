import { Ionicons } from "@expo/vector-icons";

import { PlaceholderScreen } from "~/components/placeholder-screen";

export default function SplashScreen() {
  return (
    <PlaceholderScreen
      title="Splash Screen"
      description="Loading the application..."
      icon={<Ionicons name="rocket" size={64} color="#3b82f6" />}
    />
  );
}
