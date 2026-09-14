import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { scanStyles } from "../../assets/styles/scan.styles";

export default function ScanCameraScreen() {
  const router = useRouter();

  return (
    <View style={scanStyles.container}>
      <View style={scanStyles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" style={[scanStyles.leftIcon, { fontSize: 35, fontWeight: 800 }]} />
        </TouchableOpacity>
        <Text style={[scanStyles.title2, { fontSize: 20, color: "white" }]}>Kamera Scan</Text>
      </View>

      <View style={[scanStyles.camera, { justifyContent: 'center', alignItems: 'center' }]}>
        <Ionicons name="camera-outline" size={100} color="#ccc" />
        <Text style={{ marginTop: 20, color: '#666', textAlign: 'center' }}>
          Fitur kamera sementara dinonaktifkan{"\n"}
          Silakan gunakan fitur "Upload dari galeri"
        </Text>
        
        <TouchableOpacity
          style={[scanStyles.cameraButton, { marginTop: 30 }]}
          onPress={() => router.push("/(auth)/scan-animate")}
        >
          <View style={scanStyles.cameraButtonInner}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Lanjut ke Analisis</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
