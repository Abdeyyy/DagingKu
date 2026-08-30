import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { scanStyles } from "../../assets/styles/scan.styles";
import { COLORS } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";


export default function CategoryOption() {
	return (
		<View style={scanStyles.resultsSection}>
	        <View style={scanStyles.resultsHeader}>
	          	<Text style={scanStyles.resultsCount}>Kategori yang di pilih :</Text>
	        </View>
	        <View style={scanStyles.categoryContainer}>
	          	<View style={scanStyles.categoryBox1}>
		            <Ionicons name="checkbox-outline"  style={[scanStyles.categoryBoxIcon, {color: "white"}]}></Ionicons>
		            <Text style={[scanStyles.categoryBoxTitle, {color : "white"}]}>Segar</Text>
		            <Text style={[scanStyles.categoryBoxDescription, {color: "white"}]}>Warna & tekstur segar</Text>
	         	</View>

	          	<View style={scanStyles.categoryBox2}>
	            	<Ionicons name="warning-outline"  style={[scanStyles.categoryBoxIcon, {color: "white"}]}></Ionicons>
	            	<Text style={[scanStyles.categoryBoxTitle, {color : "white"}]}>Cukup</Text>
	            	<Text style={[scanStyles.categoryBoxDescription, {color: "white"}]}>Segera diolah</Text>
	          	</View>

	          	<View style={scanStyles.categoryBox3}>
	            	<Ionicons name="close-circle-outline"  style={[scanStyles.categoryBoxIcon, {color: "white"}]}></Ionicons>
	            	<Text style={[scanStyles.categoryBoxTitle, {color : "white"}]}>Tidak layak</Text>
	            	<Text style={[scanStyles.categoryBoxDescription, {color: "white"}]}>Tidak disarankan</Text>
	          	</View>
        	</View>
      </View>
	);
}