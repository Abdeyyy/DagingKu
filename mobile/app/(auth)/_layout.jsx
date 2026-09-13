import { Stack } from "expo-router";

// Layout untuk halaman autentikasi (Login & Daftar)
// TODO: Tambahkan middleware auth di sini ketika backend sudah siap
// Contoh: if (isSignedIn) return <Redirect href="/" />;
export default function AuthRoutesLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}