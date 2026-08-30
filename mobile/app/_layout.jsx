import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Provider } from 'react-redux'
import store from "../redux/store.js";

export default function RootLayout() {

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar style="dark" />

          <Stack initialRouteName="(tabs)">
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="(auth)"
              options={{ headerShown: false }}
            />
          </Stack>

        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
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
