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
  )
}
// import { ClerkProvider } from "@clerk/clerk-expo";
// import { tokenCache } from "@clerk/clerk-expo/token-cache";
// import SafeScreen from "../components/SafeScreen";

// const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

// export default function RootLayout() {
//   return (
//     <ClerkProvider
//       publishableKey={publishableKey}
//       tokenCache={tokenCache}
//     >
//       <SafeScreen>
//         <Slot />
//       </SafeScreen>
//     </ClerkProvider>
//   );
// }
