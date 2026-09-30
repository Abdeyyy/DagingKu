import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { scanStyles } from "../../assets/styles/scan.styles";
import { COLORS } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

export default function ScanOption() {
	const router = useRouter();
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const pickImage = async () => {
    try {
      if (hasPermission === false) {
        console.log('Permission to access gallery is required');
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        console.log('Image selected:', result.assets[0].uri);
        router.push({
          pathname: "/(auth)/scan-animate",
          params: { imageUri: result.assets[0].uri }
        });
        return;
      }
    } catch (Err) {
      console.log(Err)
    }
  };

	return (
		<View style={scanStyles.resultsSection}>
        <View style={scanStyles.resultsHeader}>
          <Text style={scanStyles.resultsCount}>Pilih metode pindai :</Text>
        </View>

        <TouchableOpacity onPress={pickImage}>        
          <View style={scanStyles.menuContainer}>
            <View style={scanStyles.menuBox}>
              <LinearGradient
                 colors={["white", "white"]}
                 style={[scanStyles.linearGradientButton, {flexDirection: "row", gap: 10, alignItems: "center"}]}
                 start={{ x: 1, y: 0 }}
                 end={{ x: 0, y: 1 }}
              >
                <View style={[scanStyles.menuBoxContainerIcon, {backgroundColor: COLORS.background}]}>
                  <Ionicons name="images-outline" style={[scanStyles.menuBoxIcon, {color: "black"}]}></Ionicons>
                </View>
                <View style={[scanStyles.menuBoxContainerTitle]}>
                  <Text style={[scanStyles.menuBoxTitle, {color: "black"}]}>Upload dari galeri</Text>
                  <Text style={[scanStyles.menuBoxDescription, {color: "black"}]}>Upload foto dari penyimpanan anda saat ini juga</Text>
                </View>
                <View>
                  <Ionicons name="chevron-forward-outline" style={{fontSize: 20, color: "black"}}></Ionicons>
                </View>
              </LinearGradient>
            </View>
          </View>
        </TouchableOpacity>

        <View style={{ marginTop: 12, padding: 15, backgroundColor: '#f8f8f8', borderRadius: 10 }}>
          <Text style={{ color: '#666', textAlign: 'center' }}>
            Fitur kamera sementara tidak tersedia{"\n"}
            Silakan gunakan upload dari galeri
          </Text>
        </View>
      </View>
	);
}
