import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { COLORS } from '../constants/colors';

// Komponen untuk satu item ikon di dalam Dock
const DockItem = ({ options, route, isFocused, onPress, onLongPress }) => {
  const scale = useSharedValue(1); // Menyimpan state perbesaran ikon
  const opacity = useSharedValue(isFocused ? 1 : 0); // Menyimpan state transparansi background

  useEffect(() => {
    // Beri efek perbesaran (magnification) melenting saat tab aktif
    scale.value = withSpring(isFocused ? 1.25 : 1, { damping: 10, stiffness: 100 });
    // Munculkan background di belakang ikon saat aktif
    opacity.value = withTiming(isFocused ? 1 : 0, { duration: 250 });
  }, [isFocused]);

  // Hook Reanimated menerapkan efek scale style ke ikon
  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Hook Reanimated menerapkan efek fade in ke background
  const animatedBgStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const color = isFocused ? COLORS.primary : COLORS.textLight;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.dockItem}
      activeOpacity={0.8}
    >
      {/* Kotak background penanda aktif (dengan animasi fade) */}
      <Animated.View style={[styles.activeBackground, animatedBgStyle]} />
      
      {/* Wrapper ikon dengan animasi scale/perbesaran */}
      <Animated.View style={[animatedIconStyle, { zIndex: 10, alignItems: 'center', justifyContent: 'center' }]}>
        {options.tabBarIcon ? options.tabBarIcon({ focused: isFocused, color: color, size: 24 }) : null}
      </Animated.View>
    </TouchableOpacity>
  );
};

// Komponen Dock kustom untuk menggantikan Bottom Tab bar bawaan
export default function Dock({ state, descriptors, navigation, panelHeight = 68 }) {
  return (
    // Wadah bungkus floating dock melayang di bawah
    <View style={[styles.dockContainer, { height: panelHeight }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        // Fungsi pemicu saat ikon dock ditekan
        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // Fungsi pemicu saat ikon dock ditekan lama
        const onLongPress = () => {
          navigation.emit({ type: 'tabLongPress', target: route.key });
        };

        return (
          <DockItem
            key={route.key}
            options={options}
            route={route}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  dockContainer: {
    flexDirection: 'row',
    position: 'absolute', // Membuat dock melayang (mengambang)
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#ffffff',
    borderRadius: 35, // Membuat sudut membulat kekinian
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  dockItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  activeBackground: {
    position: 'absolute',
    width: 48, // Lebar lingkaran/pill background
    height: 48, // Tinggi lingkaran/pill background
    backgroundColor: 'rgba(252, 69, 36, 0.15)', // Warna dasar background transparan kemerahan
    borderRadius: 24, // Bulat sempurna
    zIndex: 0,
  },
});
