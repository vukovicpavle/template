import { Ionicons } from "@expo/vector-icons";

import { PlaceholderScreen } from "~/components/placeholder-screen";

export default function SearchScreen() {
  return (
    <PlaceholderScreen
      title="Global Search"
      description="Search across the app"
      icon={<Ionicons name="search" size={64} color="#3b82f6" />}
    />
  );
}
