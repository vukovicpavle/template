import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClientProvider } from "@tanstack/react-query";
import { useColorScheme } from "nativewind";

import { queryClient } from "~/utils/api";

import "../styles.css";

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "#09090B" : "#f472b6",
          },
          contentStyle: {
            backgroundColor: colorScheme === "dark" ? "#09090B" : "#FFFFFF",
          },
        }}
      >
        {/* Root level screens */}
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="splash" options={{ title: "Splash" }} />
        <Stack.Screen
          name="language-selection"
          options={{ title: "Language Selection" }}
        />
        <Stack.Screen name="aux" options={{ title: "Auxiliary" }} />
        <Stack.Screen name="onboarding" options={{ title: "Onboarding" }} />

        {/* Route groups */}
        <Stack.Screen
          name="(auth)"
          options={{ headerShown: false, title: "Authentication" }}
        />
        <Stack.Screen
          name="(main)"
          options={{ headerShown: false, title: "Main" }}
        />
        <Stack.Screen
          name="(settings)"
          options={{ headerShown: false, title: "Settings" }}
        />
        <Stack.Screen
          name="(legal)"
          options={{ headerShown: false, title: "Legal" }}
        />

        {/* Top-level feature screens */}
        <Stack.Screen
          name="notifications"
          options={{ headerShown: false, title: "Notifications" }}
        />
        <Stack.Screen
          name="search"
          options={{ headerShown: false, title: "Search" }}
        />
      </Stack>
      <StatusBar />
    </QueryClientProvider>
  );
}
