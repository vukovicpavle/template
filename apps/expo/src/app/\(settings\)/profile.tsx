import { Ionicons } from "@expo/vector-icons";

import { PlaceholderScreen } from "~/components/placeholder-screen";

export default function ProfileScreen() {
  return (
    <PlaceholderScreen
      title="Profile"
      description="View and edit your profile"
      icon={<Ionicons name="person" size={64} color="#3b82f6" />}
    />
  );
}
