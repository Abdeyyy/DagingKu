import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { scanStyles } from "../../assets/styles/scan.styles";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";

const ScanResultScreen = () => {
  const router = useRouter();
  const image = useSelector((state) => state.image.image);
  const { label, confidence, error } = useLocalSearchParams();

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
          style={[scanStyles.scanContainer, { height: 200, justifyContent: "center", overflow: "visible", zIndex: 99999 }]}
          source={{ uri: image?.uri }}
        >
          <View style={(label == "Segar")? scanStyles.capSegar : (label == "Kurang Segar")? scanStyles.capKurangSegar: scanStyles.capTidakSegar}>
            <Text style={(label == "Segar")? scanStyles.textCapSegar : (label == "Kurang Segar")? scanStyles.textCapKurangSegar: scanStyles.textCapTidakSegar}>{error ? "ERROR" : label?.toUpperCase()}</Text>
          </View>
        </ImageBackground>

        <View style={scanStyles.percentage}>
          {error ? (
            <Text style={scanStyles.resultsCount}>Gagal menganalisis gambar. Coba pindai ulang.</Text>
          ) : (
            <>
              <Text style={scanStyles.percentageText}>{confidence}%</Text>
              <Text style={scanStyles.resultsCount}>Skor Kualitas Daging: {label}</Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
};
export default ScanResultScreen;