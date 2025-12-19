import { Ionicons } from "@expo/vector-icons";

import { PlaceholderScreen } from "~/components/placeholder-screen";

export default function AuxScreen() {
  return (
    <PlaceholderScreen
      title="Auxiliary Screen"
      description="Additional functionality"
      icon={<Ionicons name="settings" size={64} color="#3b82f6" />}
    />
  );
}
