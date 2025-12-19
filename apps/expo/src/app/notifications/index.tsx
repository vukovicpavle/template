import { Ionicons } from "@expo/vector-icons";

import { PlaceholderScreen } from "~/components/placeholder-screen";

export default function NotificationsScreen() {
  return (
    <PlaceholderScreen
      title="Notifications"
      description="View all your notifications"
      icon={<Ionicons name="notifications" size={64} color="#3b82f6" />}
    />
  );
}
