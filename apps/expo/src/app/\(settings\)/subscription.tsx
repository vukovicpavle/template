import { Ionicons } from "@expo/vector-icons";

import { PlaceholderScreen } from "~/components/placeholder-screen";

export default function SubscriptionScreen() {
  return (
    <PlaceholderScreen
      title="Subscription"
      description="Manage your subscription and billing"
      icon={<Ionicons name="card" size={64} color="#3b82f6" />}
    />
  );
}
