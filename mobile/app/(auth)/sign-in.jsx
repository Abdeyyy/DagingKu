import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Dimensions,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { useSignIn } from "@clerk/clerk-expo";

const { height } = Dimensions.get("window");

const SignInScreen = () => {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Tolong isi email dan password");
      return;
    }

    if (!isLoaded) return;

    setLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
      } else {
        Alert.alert("Error", "Login gagal. Silakan coba lagi.");
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      Alert.alert("Error", err.errors?.[0]?.message || "Login gagal");
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />

      {/* Header Merah Atas */}
      <View style={styles.headerBg}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <View style={styles.logoCircle}>
            <Ionicons name="restaurant" size={28} color={COLORS.primary} />
          </View>
          <Text style={styles.appName}>DagingKu</Text>
          <Text style={styles.headerTitle}>Selamat Datang Kembali</Text>
          <Text style={styles.headerSubtitle}>
            Masuk untuk melihat riwayat dan profil Anda.
          </Text>
        </View>
      </View>

      {/* Card Form */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formCard}>
            {/* Tab Switcher */}
            <View style={styles.tabSwitcher}>
              <View style={styles.tabActive}>
                <Text style={styles.tabActiveText}>Masuk</Text>
              </View>
              <TouchableOpacity
                style={styles.tabInactive}
                onPress={() => router.replace("/(auth)/sign-up")}
              >
                <Text style={styles.tabInactiveText}>Daftar</Text>
              </TouchableOpacity>
            </View>

            {/* Kolom Email */}
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={18} color={COLORS.textLight} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Masukkan email Anda"
                placeholderTextColor={COLORS.textLight}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Kolom Password */}
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={18} color={COLORS.textLight} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Masukkan password Anda"
                placeholderTextColor={COLORS.textLight}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeBtn}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={18}
                  color={COLORS.textLight}
                />
              </TouchableOpacity>
            </View>

            {/* Lupa Password */}
            <View style={styles.forgotRow}>
              <TouchableOpacity>
                {/* TODO: sambungkan ke halaman reset password */}
                <Text style={styles.forgotText}>Lupa Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Tombol Masuk */}
            <TouchableOpacity
              style={[styles.authButton, loading && styles.buttonDisabled]}
              onPress={handleSignIn}
              disabled={loading}
              activeOpacity={0.85}
            >
              <View style={styles.swipeHint}>
                <Ionicons name="chevron-forward-outline" size={18} color={COLORS.primary} />
                <Ionicons name="chevron-forward-outline" size={18} color={COLORS.primary} style={{ marginLeft: -10 }} />
              </View>
              <Text style={styles.authButtonText}>
                {loading ? "Memproses..." : "Masuk"}
              </Text>
            </TouchableOpacity>

            {/* Link Daftar */}
            <View style={styles.switchRow}>
              <Text style={styles.switchText}>Belum punya akun? </Text>
              <TouchableOpacity onPress={() => router.replace("/(auth)/sign-up")}>
                <Text style={styles.switchLink}>Buat akun</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  headerBg: {
    backgroundColor: COLORS.primary,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 24,
  },
  headerContent: {
    alignItems: "center",
    paddingHorizontal: 24,
  },
  backBtn: {
    position: "absolute",
    left: 24,
    top: 0,
    padding: 4,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  appName: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 6,
    fontWeight: "600",
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
    textAlign: "center",
    lineHeight: 20,
  },

  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  formCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 40,
    minHeight: height * 0.62,
  },

  // Tab Switcher
  tabSwitcher: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderRadius: 30,
    padding: 4,
    marginBottom: 28,
  },
  tabActive: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 26,
    paddingVertical: 10,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabActiveText: {
    fontWeight: "700",
    color: COLORS.text,
    fontSize: 15,
  },
  tabInactive: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  tabInactiveText: {
    fontWeight: "500",
    color: COLORS.textLight,
    fontSize: 15,
  },

  // Form Inputs
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 18,
    backgroundColor: "#fafafa",
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: COLORS.text,
  },
  eyeBtn: {
    padding: 4,
  },

  forgotRow: {
    alignItems: "flex-end",
    marginBottom: 6,
    marginTop: -8,
  },
  forgotText: {
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: 13,
  },

  authButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingVertical: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
    marginBottom: 20,
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  swipeHint: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginRight: 14,
  },
  authButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  switchRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  switchText: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  switchLink: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "700",
  },
});
