import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { scanStyles } from "../../assets/styles/scan.styles";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated";
import { InferenceSession } from "onnxruntime-react-native";
import { Asset } from "expo-asset";
import usePreprocessImage  from "../../hooks/usePreprocessingImage"; // sesuaikan path
import LinearProgressIndicator from "../../components/LinearProgressIndicator";
import * as FileSystem from 'expo-file-system';
import { getInferenceSession } from "../../utils/onnxSession";
import { useLocalSearchParams } from "expo-router";

// Urutan label HARUS sama persis dengan urutan folder dataset saat training
const CLASS_LABELS = ["Segar", "Kurang Segar", "Busuk"];

function softmax(logits) {
  const maxLogit = Math.max(...logits);
  const exps = logits.map((val) => Math.exp(val - maxLogit));
  const sumExps = exps.reduce((a, b) => a + b, 0);
  return exps.map((val) => val / sumExps);
}

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
    let isMounted = true;

    // Animasi loading
    translateY.value = withRepeat(
      withTiming(-20, { duration: 1000 }),
      -1,
      true
    );

    let fakeProgress = 0;
    const progressInterval = setInterval(() => {
      fakeProgress = Math.min(fakeProgress + 0.05, 0.75);
      if (isMounted) {
        setProgress(fakeProgress);
        if (fakeProgress >= 0.3) setCheckBullets1(true);
        if (fakeProgress >= 0.6) setCheckBullets2(true);
      }
    }, 150);

    // Proses inferensi ONNX
    async function runInference() {
      try {
        if (!imageUri) throw new Error("No image found");
        
        const inputTensor = await usePreprocessImage(imageUri);
        const session = await getInferenceSession();
        
        const feeds = { input: inputTensor };
        const results = await session.run(feeds);
        const rawOutput = Array.from(results.output.data);

        const probabilities = softmax(rawOutput);

        let maxIndex = 0;
        for (let i = 1; i < probabilities.length; i++) {
          if (probabilities[i] > probabilities[maxIndex]) maxIndex = i;
        }

        const predictedLabel = CLASS_LABELS[maxIndex];
        const predictedConfidence = Math.round(probabilities[maxIndex] * 100);

        if (!isMounted) return;

        clearInterval(progressInterval);
        setProgress(1);
        setCheckBullets3(true);
        setScanResult({ label: predictedLabel, confidence: predictedConfidence });

        setTimeout(() => {
          if (!isMounted) return;
          router.replace({
            pathname: "/(auth)/scan-result",
            params: {
              label: predictedLabel,
              confidence: predictedConfidence,
              imageUri: imageUri || null
            }
          });
        }, 1500);

      } catch (error) {
        console.error("Gagal menjalankan inferensi ONNX:", error);
        if (!isMounted) return;
        clearInterval(progressInterval);
        router.replace({
          pathname: "/(auth)/scan-result",
          params: { error: "true", imageUri: imageUri || null },
        });
      }
    }

    runInference();

    return () => {
      isMounted = false;
      clearInterval(progressInterval);
    };
  }, [imageUri]);

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
          <Text style={checkBullets1 ? scanStyles.textOn : scanStyles.textOff}>Mendeteksi jenis dan area daging</Text>
        </View>
        <View style={scanStyles.listItemProgress}>
          <Text style={checkBullets2 ? scanStyles.bulletOn : scanStyles.bulletOff}>{"\u2022"}</Text>
          <Text style={checkBullets2 ? scanStyles.textOn : scanStyles.textOff}>Menganalisa warna dan textur</Text>
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
