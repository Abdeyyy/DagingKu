import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";

// ─────────────────────────────────────────────────────────────────────────────
// PLACEHOLDER: Ganti isLoggedIn dengan state dari context/auth backend nanti
// ─────────────────────────────────────────────────────────────────────────────
const isLoggedIn = true; // TODO: sambungkan ke backend auth

// Data dummy user — nanti diambil dari backend
const dummyUser = {
  name: "Budi Santoso",
  email: "budi@example.com",
  avatar: null, // TODO: ganti dengan URL foto dari backend
  totalScan: 12,
  joinDate: "Agustus 2026",
};

// ─────────────────────────────────────────────────────────────────────────────
// Komponen jika BELUM login — tampil tombol masuk & daftar
// ─────────────────────────────────────────────────────────────────────────────
const GuestView = () => {
  const router = useRouter();
  return (
    <View style={styles.guestContainer}>
      <View style={styles.guestIllustration}>
        <Ionicons name="person-circle-outline" size={100} color={COLORS.border} />
      </View>
      <Text style={styles.guestTitle}>Belum Masuk</Text>
      <Text style={styles.guestSubtitle}>
        Masuk untuk menyimpan riwayat scan dan melihat profil Anda.
      </Text>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => router.push("/(auth)/sign-in")}
        activeOpacity={0.85}
      >
        <Text style={styles.loginButtonText}>Masuk</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => router.push("/(auth)/sign-up")}
        activeOpacity={0.85}
      >
        <Text style={styles.registerButtonText}>Daftar Akun Baru</Text>
      </TouchableOpacity>
    </View>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Komponen jika SUDAH login — tampil profil & menu
// ─────────────────────────────────────────────────────────────────────────────
const ProfileView = () => {
  const router = useRouter();

  const menuItems = [
    { icon: "person-outline", label: "Edit Profil", onPress: () => {} },
    { icon: "time-outline", label: "Riwayat Scan Saya", onPress: () => router.push("/(tabs)/histori") },
    { icon: "shield-checkmark-outline", label: "Ubah Password", onPress: () => {} },
    { icon: "notifications-outline", label: "Notifikasi", onPress: () => {} },
    { icon: "help-circle-outline", label: "Bantuan", onPress: () => {} },
  ];

  return (
    <ScrollView style={styles.profileScroll} showsVerticalScrollIndicator={false}>
      {/* Header Profil */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarWrapper}>
          {dummyUser.avatar ? (
            <Image source={{ uri: dummyUser.avatar }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitial}>
                {dummyUser.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          <TouchableOpacity style={styles.editAvatarBtn} activeOpacity={0.8}>
            <Ionicons name="camera" size={14} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>{dummyUser.name}</Text>
        <Text style={styles.profileEmail}>{dummyUser.email}</Text>
        <View style={styles.statBadge}>
          <Ionicons name="scan-outline" size={14} color={COLORS.primary} />
          <Text style={styles.statText}>{dummyUser.totalScan} kali scan</Text>
          <Text style={styles.statDivider}>•</Text>
          <Text style={styles.statText}>Bergabung {dummyUser.joinDate}</Text>
        </View>
      </View>

      {/* Menu Akun */}
      <View style={styles.menuCard}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, index < menuItems.length - 1 && styles.menuItemBorder]}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <View style={styles.menuLeft}>
              <View style={styles.menuIconWrap}>
                <Ionicons name={item.icon} size={20} color={COLORS.primary} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textLight} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Tombol Logout */}
      <TouchableOpacity
        style={styles.logoutButton}
        // TODO: panggil fungsi signOut dari backend di sini
        onPress={() => {}}
        activeOpacity={0.85}
      >
        <Ionicons name="log-out-outline" size={20} color="#E53935" />
        <Text style={styles.logoutText}>Keluar</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Screen utama
// ─────────────────────────────────────────────────────────────────────────────
const AccountScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Akun</Text>
      </View>
      {isLoggedIn ? <ProfileView /> : <GuestView />}
    </SafeAreaView>
  );
};

export default AccountScreen;

// ─────────────────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },

  // ── Guest View ──
  guestContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  guestIllustration: {
    marginBottom: 16,
    opacity: 0.5,
  },
  guestTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 10,
  },
  guestSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 36,
  },
  loginButton: {
    width: "100%",
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 14,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  registerButton: {
    width: "100%",
    backgroundColor: "transparent",
    paddingVertical: 16,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: "center",
  },
  registerButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "700",
  },

  // ── Profile View ──
  profileScroll: {
    flex: 1,
  },
  profileHeader: {
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 24,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 14,
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitial: {
    fontSize: 36,
    fontWeight: "700",
    color: "#fff",
  },
  editAvatarBtn: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 5,
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 14,
  },
  statBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3F0",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    gap: 6,
  },
  statText: {
    fontSize: 12,
    color: COLORS.text,
  },
  statDivider: {
    color: COLORS.textLight,
    fontSize: 12,
  },

  // ── Menu ──
  menuCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  menuIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#FFF3F0",
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: {
    fontSize: 15,
    color: COLORS.text,
    fontWeight: "500",
  },

  // ── Logout ──
  logoutButton: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#E53935",
  },
});
