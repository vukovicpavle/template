import type { ReactNode } from "react";
import { ScrollView, Text, View } from "react-native";

interface PlaceholderScreenProps {
  title: string;
  description?: string;
  icon?: ReactNode;
}

/**
 * Placeholder component for screens during development
 * Displays a centered title and optional description
 */
export function PlaceholderScreen({
  title,
  description,
  icon,
}: PlaceholderScreenProps) {
  return (
    <ScrollView className="flex-1">
      <View className="flex-1 items-center justify-center gap-4 p-8">
        {icon && <View className="mb-4">{icon}</View>}
        <Text className="text-center text-2xl font-bold">{title}</Text>
        {description && (
          <Text className="text-center text-sm text-gray-600 dark:text-gray-400">
            {description}
          </Text>
        )}
        <View className="mt-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <Text className="text-center text-xs text-gray-500 dark:text-gray-400">
            This is a placeholder screen. Functionality will be implemented
            later.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
