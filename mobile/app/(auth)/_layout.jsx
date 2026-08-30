import { Stack } from "expo-router";
// import { useAuth } from "@clerk/clerk-expo";

export default function Layout() {
  // const { isSignedIn } = useAuth();

  // if (isSignedIn) return <Redirect href={"/"} />;

  return <Stack screenOptions={{ headerShown: false }} />;
}


// Digunakan buat nanti kalo middleware sudah jadi
