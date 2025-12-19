import { Ionicons } from "@expo/vector-icons";

import { PlaceholderScreen } from "~/components/placeholder-screen";

export default function ReportIssueScreen() {
  return (
    <PlaceholderScreen
      title="Report Issue"
      description="Let us know about problems or bugs"
      icon={<Ionicons name="bug" size={64} color="#ef4444" />}
    />
  );
}
