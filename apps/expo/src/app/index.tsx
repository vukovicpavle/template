import { ScrollView, Text, View } from "react-native";

import { RNReusablesDemo } from "../components/rn-reusables-demo";
import { StoreDemo } from "../components/store-demo";

export default function Index() {
  return (
    <ScrollView className="flex-1">
      <View className="flex-1 items-center justify-center gap-8 py-8">
        <Text className="mb-6 text-2xl font-bold">Expo + Zustand</Text>
        <StoreDemo />
        <View className="w-full border-t border-border pt-8">
          <RNReusablesDemo />
        </View>
      </View>
    </ScrollView>
  );
}
