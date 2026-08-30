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
  const image = useSelector((state) => state.image.image);
  const [imageBackgroundHeight, setImageBackgroundHeight] = useState(0);
  const [progress, setProgress] = useState(0);
  const [checkBullets1, setCheckBullets1] = useState(false);
  const [checkBullets2, setCheckBullets2] = useState(false);
  const [checkBullets3, setCheckBullets3] = useState(false);

  const scanLineValue = useSharedValue(imageBackgroundHeight);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: scanLineValue.value }],
  }));

  useEffect(() => {
    if (imageBackgroundHeight === 0) return;

    let isMounted = true;

    // Animasi ScanLine (visual saja, tidak terkait proses inferensi)
    scanLineValue.value = withRepeat(
      withTiming(imageBackgroundHeight, { duration: 1000 }),
      -1,
      true
    );

    // Progress bar palsu untuk checklist 1 & 2 (sekadar UI, berjalan sambil menunggu proses asli)
    // Dibatasi maksimal 0.75 supaya tidak mendahului hasil asli yang belum tentu selesai
    let fakeProgress = 0;
    const progressInterval = setInterval(() => {
      fakeProgress = Math.min(fakeProgress + 0.05, 0.75);
      if (isMounted) {
        setProgress(fakeProgress);
        if (fakeProgress >= 0.25) setCheckBullets1(true);
        if (fakeProgress >= 0.5) setCheckBullets2(true);
      }
    }, 100);

    // Proses inferensi ONNX yang sesungguhnya
    async function runInference() {
      try {
        const inputTensor = await usePreprocessImage(image.uri);

        const session = await getInferenceSession();

        
        const feeds = { input: inputTensor };
        const results = await session.run(feeds);
        const rawOutput = Array.from(results.output.data);

        const probabilities = softmax(rawOutput);
        console.log(probabilities);

        let maxIndex = 0;
        for (let i = 1; i < probabilities.length; i++) {
          if (probabilities[i] > probabilities[maxIndex]) maxIndex = i;
        }

        const predictedLabel = CLASS_LABELS[maxIndex];
        const predictedConfidence = (probabilities[maxIndex] * 100).toFixed(1);

        if (!isMounted) return;

        clearInterval(progressInterval);
        setProgress(1);
        setCheckBullets3(true);

        // Jeda singkat biar user sempat lihat checklist ke-3 tercentang sebelum pindah halaman
        setTimeout(() => {
          router.replace({
            pathname: "/scan-result",
            params: { label: predictedLabel, confidence: predictedConfidence },
          });
        }, 400);
      } catch (error) {
        console.error("Gagal menjalankan inferensi ONNX:", error);
        if (!isMounted) return;
        clearInterval(progressInterval);
        router.replace({
          pathname: "/scan-result",
          params: { error: "true" },
        });
      }
    }

    runInference();

    return () => {
      isMounted = false;
      clearInterval(progressInterval);
    };
  }, [imageBackgroundHeight]);

  return (
    <View style={scanStyles.container}>
      <View style={scanStyles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" style={[scanStyles.leftIcon, { fontSize: 35, fontWeight: 800 }]} />
        </TouchableOpacity>
        <Text style={[scanStyles.title2, { fontSize: 20, color: "white" }]}>Hasil Pindai</Text>
      </View>
      <View style={scanStyles.scanSection}>
        <ImageBackground
          style={[scanStyles.scanContainer]}
          source={{ uri: image.uri }}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setImageBackgroundHeight(height - 42);
          }}
        >
          <View style={[scanStyles.linearGradient, { flexDirection: "column", height: 400 }]}>
            <Animated.View style={[scanStyles.scanLine, animatedStyles]} />
            <View style={scanStyles.cornerTopLeft} />
            <View style={scanStyles.cornerTopRight} />
            <View style={scanStyles.cornerBottomLeft} />
            <View style={scanStyles.cornerBottomRight} />
          </View>
        </ImageBackground>

        <View style={scanStyles.resultsHeader}>
          <Text style={scanStyles.resultsCount}>Menganalisis gambar :</Text>
        </View>
        <LinearProgressIndicator progress={progress} />

        <View style={scanStyles.listProgress}>
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
    </View>
  );
};
export default ScanAnimateScreen;