import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { scanStyles } from "../../assets/styles/scan.styles";
import { COLORS } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from "react-redux";
import { storeImage } from "../../redux/slices/imageSlice.js";

export default function ScanOption() {
	const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const dispatch = useDispatch();

  async function navigate() {
    if (permission?.granted) {
      router.push("/scan-camera");
      return;
    }

    const result = await requestPermission();

    if (result.granted) {
      router.push("/scan-camera");
    }
  }



   const pickImage = async () => {
    
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert('Permission required', 'Permission to access the camera is required.');
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });


      if (!result.canceled) {
        dispatch(storeImage(result.assets[0]));
        router.push("/scan-animate");
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

        <TouchableOpacity onPress={navigate}>
          <View style={scanStyles.menuContainer}>
            <View style={scanStyles.menuBox}>
              <LinearGradient
                 colors={COLORS.gradient}
                 style={[scanStyles.linearGradientButton, {flexDirection: "row", gap: 10, alignItems: "center"}]}
                 start={{ x: 1, y: 0 }}
                 end={{ x: 0, y: 1 }}
              >
                <View style={[scanStyles.menuBoxContainerIcon]}>
                  <Ionicons name="camera-outline" style={[scanStyles.menuBoxIcon, {color: "white"}]}></Ionicons>
                </View>
                <View style={[scanStyles.menuBoxContainerTitle]}>
                  <Text style={[scanStyles.menuBoxTitle, {color: "white"}]}>Ambil Foto Langsung</Text>
                  <Text style={scanStyles.menuBoxDescription}>Gunakan kamera untuk memindai saat ini juga</Text>
                </View>
                <View>
                  <Ionicons name="chevron-forward-outline" style={{fontSize: 20, color: "white"}}></Ionicons>
                </View>
              </LinearGradient>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{marginTop: 12}} onPress={pickImage}>        
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
      </View>
	);
}