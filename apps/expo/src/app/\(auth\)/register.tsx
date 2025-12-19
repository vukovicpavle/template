import { Ionicons } from "@expo/vector-icons";

import { PlaceholderScreen } from "~/components/placeholder-screen";

export default function RegisterScreen() {
  return (
    <PlaceholderScreen
      title="Register"
      description="Create a new account"
      icon={<Ionicons name="person-add" size={64} color="#3b82f6" />}
    />
  );
}
