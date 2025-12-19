import { Ionicons } from "@expo/vector-icons";

import { PlaceholderScreen } from "~/components/placeholder-screen";

export default function DeleteAccountScreen() {
  return (
    <PlaceholderScreen
      title="Delete Account"
      description="Permanently delete your account"
      icon={<Ionicons name="trash" size={64} color="#ef4444" />}
    />
  );
}
