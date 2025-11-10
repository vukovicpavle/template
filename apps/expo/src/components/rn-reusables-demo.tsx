import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

import { Button, Input } from "./ui";

export function RNReusablesDemo() {
  const [inputValue, setInputValue] = useState("");

  const handleButtonPress = () => {
    Alert.alert("Button Pressed", `Input value: ${inputValue || "(empty)"}`);
  };

  const handleInputChange = (text: string) => {
    setInputValue(text);
  };

  return (
    <View className="w-full items-center justify-center gap-6 p-6">
      <Text className="mb-4 text-2xl font-bold">
        React Native Reusables Demo
      </Text>

      {/* Input Component Demo */}
      <View className="w-full max-w-md gap-2">
        <Text className="text-lg font-semibold">Input Component</Text>
        <Input
          placeholder="Enter some text..."
          value={inputValue}
          onChangeText={handleInputChange}
          className="w-full"
        />
        <Text className="text-sm text-muted-foreground">
          Current value: {inputValue || "(empty)"}
        </Text>
      </View>

      {/* Button Component Demo */}
      <View className="w-full max-w-md gap-4">
        <Text className="text-lg font-semibold">Button Component</Text>

        {/* Default Button */}
        <Button onPress={handleButtonPress} variant="default">
          Default Button
        </Button>

        {/* Destructive Button */}
        <Button onPress={handleButtonPress} variant="destructive">
          Destructive Button
        </Button>

        {/* Outline Button */}
        <Button onPress={handleButtonPress} variant="outline">
          Outline Button
        </Button>

        {/* Secondary Button */}
        <Button onPress={handleButtonPress} variant="secondary">
          Secondary Button
        </Button>

        {/* Ghost Button */}
        <Button onPress={handleButtonPress} variant="ghost">
          Ghost Button
        </Button>

        {/* Link Button */}
        <Button onPress={handleButtonPress} variant="link">
          Link Button
        </Button>

        {/* Size Variants */}
        <View className="gap-2">
          <Text className="text-base font-medium">Size Variants:</Text>
          <Button onPress={handleButtonPress} size="sm">
            Small Button
          </Button>
          <Button onPress={handleButtonPress} size="default">
            Default Button
          </Button>
          <Button onPress={handleButtonPress} size="lg">
            Large Button
          </Button>
        </View>
      </View>
    </View>
  );
}
