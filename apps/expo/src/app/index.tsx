import { Text, View, ScrollView } from "react-native";
import { StoreDemo } from "../components/StoreDemo";

export default function Index() {
  return (
    <ScrollView className="flex-1">
      <View className="flex-1 items-center justify-center py-8">
        <Text className="text-2xl font-bold mb-6">Expo + Zustand</Text>
        <StoreDemo />
      </View>
    </ScrollView>
  );
}
