import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { 
  useCounterStore, 
  useUser, 
  useTheme, 
  useLoading,
  type User 
} from "@acme/store";

export function StoreDemo() {
  const { count, increment, decrement, reset } = useCounterStore();
  const { user, setUser, clearUser } = useUser();
  const { theme, setTheme } = useTheme();
  const { isLoading, setLoading } = useLoading();

  const handleSetUser = () => {
    const newUser: User = {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
    };
    setUser(newUser);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleLoading = () => {
    setLoading(!isLoading);
  };

  return (
    <View className="w-full max-w-md space-y-4 p-4">
      <Text className="text-xl font-bold mb-4">Zustand Store Demo</Text>
      
      {/* Counter Section */}
      <View className="space-y-2">
        <Text className="text-lg font-semibold">Counter: {count}</Text>
        <View className="flex-row space-x-2">
          <TouchableOpacity 
            onPress={increment}
            className="bg-blue-500 px-4 py-2 rounded"
          >
            <Text className="text-white">+</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={decrement}
            className="bg-red-500 px-4 py-2 rounded"
          >
            <Text className="text-white">-</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={reset}
            className="bg-gray-500 px-4 py-2 rounded"
          >
            <Text className="text-white">Reset</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* User Section */}
      <View className="space-y-2">
        <Text className="text-lg font-semibold">
          User: {user ? user.name : 'Not logged in'}
        </Text>
        {user && (
          <Text className="text-sm text-gray-600">Email: {user.email}</Text>
        )}
        <View className="flex-row space-x-2">
          <TouchableOpacity 
            onPress={handleSetUser}
            className="bg-green-500 px-4 py-2 rounded"
          >
            <Text className="text-white">Set User</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={clearUser}
            className="bg-red-500 px-4 py-2 rounded"
          >
            <Text className="text-white">Clear User</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Theme Section */}
      <View className="space-y-2">
        <Text className="text-lg font-semibold">Theme: {theme}</Text>
        <TouchableOpacity 
          onPress={toggleTheme}
          className="bg-purple-500 px-4 py-2 rounded"
        >
          <Text className="text-white">Toggle Theme</Text>
        </TouchableOpacity>
      </View>

      {/* Loading Section */}
      <View className="space-y-2">
        <Text className="text-lg font-semibold">
          Loading: {isLoading ? 'Yes' : 'No'}
        </Text>
        <TouchableOpacity 
          onPress={toggleLoading}
          className="bg-orange-500 px-4 py-2 rounded"
        >
          <Text className="text-white">Toggle Loading</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}