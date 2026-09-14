import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { scanStyles } from "../../assets/styles/scan.styles";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated";
import LinearProgressIndicator from "../../components/LinearProgressIndicator";
import { useLocalSearchParams } from "expo-router";

const ScanAnimateScreen = () => {
  const router = useRouter();
  const { imageUri } = useLocalSearchParams();
  
  const [imageBackgroundHeight, setImageBackgroundHeight] = useState(0);
  const [progress, setProgress] = useState(0);
  const [checkBullets1, setCheckBullets1] = useState(false);
  const [checkBullets2, setCheckBullets2] = useState(false);
  const [checkBullets3, setCheckBullets3] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const translateY = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    // Animasi loading
    translateY.value = withRepeat(
      withTiming(-20, { duration: 1000 }),
      -1,
      true
    );

    // Simulasi proses scan
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) {
          clearInterval(interval);
          
          // Set hasil scan dummy
          setTimeout(() => {
            const results = ["Segar", "Kurang Segar", "Busuk"];
            const randomResult = results[Math.floor(Math.random() * results.length)];
            const randomConfidence = Math.floor(Math.random() * 30) + 70; // 70-100%
            
            setScanResult({ label: randomResult, confidence: randomConfidence });
            
            // Navigate ke hasil setelah 2 detik
            setTimeout(() => {
              router.push({
                pathname: "/(auth)/scan-result",
                params: {
                  label: randomResult,
                  confidence: randomConfidence,
                  imageUri: imageUri || null
                }
              });
            }, 2000);
          }, 1000);
          
          return 1;
        }
        return prev + 0.05;
      });

      // Update checklist
      if (progress >= 0.3 && !checkBullets1) setCheckBullets1(true);
      if (progress >= 0.6 && !checkBullets2) setCheckBullets2(true);
      if (progress >= 0.9 && !checkBullets3) setCheckBullets3(true);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={scanStyles.container}>
      <View style={scanStyles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" style={[scanStyles.leftIcon, { fontSize: 35, fontWeight: 800 }]} />
        </TouchableOpacity>
        <Text style={[scanStyles.title2, { fontSize: 20, color: "white" }]}>Scan Animate</Text>
      </View>

      <View style={scanStyles.scanSection}>
        <ImageBackground
          style={[scanStyles.scanContainer, { height: 200 }]}
          source={{ uri: imageUri || null }}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setImageBackgroundHeight(height);
          }}
        >
          {!scanResult && (
            <Animated.View style={[scanStyles.scanLine, animatedStyle]} />
          )}
          
          {scanResult && (
            <View style={scanResult.label === "Segar" ? scanStyles.capSegar : 
                         scanResult.label === "Kurang Segar" ? scanStyles.capKurangSegar : 
                         scanStyles.capTidakSegar}>
              <Text style={scanResult.label === "Segar" ? scanStyles.textCapSegar : 
                          scanResult.label === "Kurang Segar" ? scanStyles.textCapKurangSegar : 
                          scanStyles.textCapTidakSegar}>
                {scanResult.label.toUpperCase()}
              </Text>
            </View>
          )}
        </ImageBackground>

        <View style={scanStyles.percentage}>
          {!scanResult ? (
            <>
              <Text style={scanStyles.percentageText}>{Math.round(progress * 100)}%</Text>
              <Text style={scanStyles.resultsCount}>Sedang menganalisis gambar...</Text>
            </>
          ) : (
            <>
              <Text style={scanStyles.percentageText}>{scanResult.confidence}%</Text>
              <Text style={scanStyles.resultsCount}>Analisis selesai!</Text>
            </>
          )}
        </View>
      </View>

      <LinearProgressIndicator progress={progress} />

      <View style={scanStyles.checklist}>
        <View style={scanStyles.listItemProgress}>
          <Text style={checkBullets1 ? scanStyles.bulletOn : scanStyles.bulletOff}>{"\u2022"}</Text>
          <Text style={checkBullets1 ? scanStyles.textOn : scanStyles.textOff}>Memuat gambar</Text>
        </View>
        <View style={scanStyles.listItemProgress}>
          <Text style={checkBullets2 ? scanStyles.bulletOn : scanStyles.bulletOff}>{"\u2022"}</Text>
          <Text style={checkBullets2 ? scanStyles.textOn : scanStyles.textOff}>Menganalisis tekstur dan warna</Text>
        </View>
        <View style={scanStyles.listItemProgress}>
          <Text style={checkBullets3 ? scanStyles.bulletOn : scanStyles.bulletOff}>{"\u2022"}</Text>
          <Text style={checkBullets3 ? scanStyles.textOn : scanStyles.textOff}>Menghitung skor kualitas</Text>
        </View>
      </View>
    </View>
  );
};

export default ScanAnimateScreen;
