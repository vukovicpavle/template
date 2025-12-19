import { Ionicons } from "@expo/vector-icons";

import { PlaceholderScreen } from "~/components/placeholder-screen";

export default function LogoutScreen() {
  return (
    <PlaceholderScreen
      title="Logout"
      description="Sign out of your account"
      icon={<Ionicons name="log-out" size={64} color="#3b82f6" />}
    />
  );
}
