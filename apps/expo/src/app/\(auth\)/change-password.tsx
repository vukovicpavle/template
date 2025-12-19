import { Ionicons } from "@expo/vector-icons";

import { PlaceholderScreen } from "~/components/placeholder-screen";

export default function ChangePasswordScreen() {
  return (
    <PlaceholderScreen
      title="Change Password"
      description="Set a new password"
      icon={<Ionicons name="lock-closed" size={64} color="#3b82f6" />}
    />
  );
}
