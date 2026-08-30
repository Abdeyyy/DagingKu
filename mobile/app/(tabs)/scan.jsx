import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, Button, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { scanStyles } from "../../assets/styles/scan.styles";
import { COLORS } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import RecipeCard from "../../components/RecipeCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import CategoryOption from "../../components/scan/CategoryOption";
import ScanOption from "../../components/scan/ScanOption";
import { useRouter } from "expo-router";
import * as ImagePicker from 'expo-image-picker';

const ScanScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [image, setImage] = useState(null);

   const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };


  return (
    <View style={scanStyles.container}>
      <View style={scanStyles.scanSection}>
        <View style={scanStyles.scanContainer}>
          <LinearGradient
             colors={COLORS.gradient}
             style={[scanStyles.linearGradient, {flexDirection: "column"}]}
             start={{ x: 1, y: 0 }}
             end={{ x: 0, y: 1 }}
          >
            <View style={scanStyles.cornerTopLeft} />
            <View style={scanStyles.cornerTopRight} />
            <View style={scanStyles.cornerBottomLeft} />
            <View style={scanStyles.cornerBottomRight} />
            <View style={scanStyles.scanTitle}>
               <Text style={scanStyles.title1}>DAGING</Text><Text style={scanStyles.title2}>KU</Text> 
            </View>

            <Text style={scanStyles.paragraph}>Periksa kesegaran dan kualitas daging hanya dalam hitungan detik.</Text>
            
          </LinearGradient>
        </View>
      </View>

      <CategoryOption />
      <ScanOption />

    </View>
  );
};
export default ScanScreen;
