import { Ionicons } from "@expo/vector-icons";

import { PlaceholderScreen } from "~/components/placeholder-screen";

export default function NotificationSettingsScreen() {
  return (
    <PlaceholderScreen
      title="Notification Settings"
      description="Manage notification preferences"
      icon={<Ionicons name="notifications" size={64} color="#3b82f6" />}
    />
  );
}
