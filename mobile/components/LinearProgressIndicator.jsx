import { View } from 'react-native';
import { COLORS } from "../constants/colors";

export default function LinearProgressIndicator({progress}) {
  return (
    <View
      style={{
        width: "100%",
        height: 8,
        backgroundColor: "#ddd",
        borderRadius: 4,
        overflow: "hidden",
        marginVertical: 0
      }}
    >
      <View
        style={{
          width: `${progress * 100}%`,
          height: "100%",
          backgroundColor: COLORS.primary,
        }}
      />
    </View>
  )
}


