import { ScrollView, Text, View } from "react-native";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

import { GoogleSignInButton } from "~/components/google-auth";
import { useTranslation } from "~/hooks/useTranslation";
import { RNReusablesDemo } from "../components/rn-reusables-demo";
import { StoreDemo } from "../components/store-demo";

export default function Index() {
  const { t, locale } = useTranslation();

  return (
    <ScrollView className="flex-1">
      <View className="flex-1 items-center justify-center gap-8 py-8">
        <View className="mb-6 items-center gap-4">
          <Text className="text-2xl font-bold">{t("home.title")}</Text>
          <Text className="text-sm text-gray-600">
            {t("home.subtitle")} ({locale})
          </Text>
          <View className="flex-row items-center gap-4">
            <Ionicons name="rocket" size={32} color="#3b82f6" />
            <MaterialIcons name="favorite" size={32} color="#ef4444" />
            <FontAwesome name="star" size={32} color="#f59e0b" />
          </View>
          <Text className="text-center text-sm text-gray-500">
            {t("home.description")}
          </Text>
        </View>
        <View className="w-full max-w-sm px-4">
          <GoogleSignInButton />
        </View>
        <StoreDemo />
        <View className="w-full border-t border-border pt-8">
          <RNReusablesDemo />
        </View>
      </View>
    </ScrollView>
  );
}
