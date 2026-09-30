<<<<<<< HEAD
import { Stack } from "expo-router";
// import { useAuth } from "@clerk/clerk-expo";

export default function Layout() {
  // const { isSignedIn } = useAuth();

  // if (isSignedIn) return <Redirect href={"/"} />;

  return <Stack screenOptions={{ headerShown: false }} />;
}


// Digunakan buat nanti kalo middleware sudah jadi
=======
import { Stack } from "expo-router";

// Layout untuk halaman autentikasi (Login & Daftar)
// TODO: Tambahkan middleware auth di sini ketika backend sudah siap
// Contoh: if (isSignedIn) return <Redirect href="/" />;
export default function AuthRoutesLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
>>>>>>> dbeafc575cb0c61d5a3bbcbc51f8424459c4546f
