import { CameraView } from "expo-camera";
import { useRef } from "react";
import {
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { storeImage } from "../../redux/slices/imageSlice.js";
import { scanStyles } from "../../assets/styles/scan.styles";

export default function ScanCameraScreen() {
  const camera = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  const takePicture = async () => {
    try {
      if (!camera.current) return;

      const data = await camera.current.takePictureAsync({
        quality: 1,
        base64: false,
      });

      dispatch(storeImage(data));

      router.push("/scan-animate");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={scanStyles.container}>

      {isFocused && (
        <CameraView
          ref={camera}
          style={scanStyles.camera}
          facing="back"
        />
      )}

      <TouchableOpacity
        style={scanStyles.leftButton}
        onPress={() => router.back()}
      >
        <Ionicons
          name="arrow-back-circle-outline"
          style={scanStyles.leftIcon}
        />
      </TouchableOpacity>

      <View style={scanStyles.buttonContainer}>
        <TouchableOpacity
          style={scanStyles.cameraButton}
          onPress={takePicture}
        >
          <View style={scanStyles.cameraButtonInner}>
            <Ionicons name="camera-outline" size={32} />
          </View>
        </TouchableOpacity>
      </View>

    </View>
  );
}