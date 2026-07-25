import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1}}>
        <StatusBar style="dark" />
        <Slot />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}