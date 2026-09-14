import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const scanStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scanSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  scanContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
    position: "relative",
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  scanTitle: {
    flexDirection: "row", 
    margin: 0,
    padding: 0,
  },
  linearGradient: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 35,
  },
  linearGradientButton: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  title2: {
    fontSize: 26, 
    fontWeight: 800,
    color: COLORS.title2
  },
  title1: {
    fontSize: 26, 
    fontWeight: 800,
    color: COLORS.title1
  },
  paragraph: {
    color: COLORS.white,
    fontWeight: 300
  },  
  resultsSection: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 16,
  },
  resultsCount: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: "500",
  },


  categoryContainer: {
    flexDirection: "row",
    gap: 20,
  },

  categoryBox1: {
    flex: 1,
    height: 100,
    borderRadius: 15,
    overflow: "hidden",
    flexDirection: "column",
    paddingHorizontal: 7.5,
    paddingVertical: 10,
    backgroundColor: "green",
  },

  categoryBox2: {
    flex: 1,
    height: 100,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "orange",
    flexDirection: "column",
    paddingHorizontal: 7.5,
    paddingVertical: 10,
  },

  categoryBox3: {
    flex: 1,
    height: 100,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "red",
    flexDirection: "column",
    paddingHorizontal: 7.5,
    paddingVertical: 10,
  },

  categoryBoxIcon: {
    fontSize: 30,
  }, 

  categoryBoxTitle: {
    fontWeight: 800
  },

  categoryBoxDescription: {
    fontSize: 10
  },

  menuContainer: {
    flexDirection: "column",
    gap: 20,
  },

  menuBox: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
    borderColor: COLORS.border,
  },

  menuBoxIcon : {
    fontSize: 23,
  },

  menuBoxContainerIcon: {
    backgroundColor: "#f6f0e6", 
    padding: 10, 
    alignSelf: "center",
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, .16)"
  },

  menuBoxContainerTitle: {
    flex: 3,
  },

  menuBoxTitle: {
    fontSize: 15,
    fontWeight: 900,
  },

  menuBoxDescription: {
    color: "white", 
    fontSize: 13
  },

  cornerTopLeft: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 22,
    height: 22,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: "rgba(255,255,255,0.9)",
    borderTopLeftRadius: 8,
  },

  cornerTopRight: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 22,
    height: 22,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "rgba(255,255,255,0.9)",
    borderTopRightRadius: 8,
  },

  cornerBottomLeft: {
    position: "absolute",
    bottom: 10,
    left: 10,
    width: 22,
    height: 22,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: "rgba(255,255,255,0.9)",
    borderBottomLeftRadius: 8,
  },

  cornerBottomRight: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 22,
    height: 22,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: "rgba(255,255,255,0.9)",
    borderBottomRightRadius: 8,
  },

  // Style Scan-camera
  camera: {
    flex: 1,
  },

  buttonContainer: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",

    width: 80,
    height: 80,
    borderRadius: 40,

    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.7)",

    backgroundColor: "transparent",

    alignItems: "center",
    justifyContent: "center",
  },

  cameraButton: {
    width: 64,
    height: 64,
    borderRadius: 32,

    backgroundColor: "white",

    alignItems: "center",
    justifyContent: "center",
  },

  cameraButtonInner: {
    width: 58,
    height: 58,
    borderRadius: 29,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "white",
  },

  leftButton: {
    position: "absolute", 
    bottom: 50,
    left: 40
  },

  leftIcon: {
    color: COLORS.white,
    fontSize: 60
  },

  // Scan Animate JS
  header: {
    backgroundColor: COLORS.gradient[1],
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 15
  },


  scanLine: {
    position: "absolute",
    top: 20,
    width: '100%',
    height: 0,
    borderTopWidth: 4,
    borderRadius: 2,
    borderColor: "red",
    alignSelf: "center",
    opacity: 0.7
  },

  listProgress: {
    marginVertical: 10,
    paddingVertical: 10,
    gap: 10,
    opacity: 0.5
  },

  listItemProgress: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },

  bulletOn: {
    width: 20,
    fontSize: 60,
    lineHeight: 20,
    color: "green",
    textShadowColor: "green",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 14,
  },

  bulletOff: {
    width: 20,
    fontSize: 60,
    lineHeight: 20,
    color: 'red',
    textShadowColor: 'red',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 14,
  },

  textOff: {
    color: "black",
    fontWeight: '500',
    letterSpacing: 1,
    fontSize: 13,
    opacity: 0.7
  },

  textOn: {
    color: "black",
    fontWeight: '500',
    letterSpacing: 1,
    fontSize: 13,
    opacity: 1,
    fontWeight: 600,
  },

// Scan Result
  capSegar: {
    height: 100, 
    width: 100, 
    borderRadius: 100,
    backgroundColor: "white",
    bottom: -50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "green",
    borderStyle: "dashed",
    position: "absolute"

  },

  textCapSegar: {
    fontFamily: "Google Sans",
    fontWeight: "bold",
    fontSize: 20,
    color: "green",
    letterSpacing: 1.5,
    transform: [
      { rotate: "-30deg" }
    ],
  },

  percentage: {
    marginTop: 75, 
    justifyContent: "center",
    alignItems: "center",
  },

  percentageText: {
    fontFamily: "Google Sans",
    fontWeight: "bold",
    fontSize: 35,

  },

  capKurangSegar: {
    height: 100, 
    width: 100, 
    borderRadius: 100,
    backgroundColor: "white",
    bottom: -50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "orange",
    borderStyle: "dashed",
    position: "absolute"

  },

  textCapKurangSegar: {
    fontFamily: "Google Sans",
    fontWeight: "bold",
    fontSize: 20,
    color: "orange",
    letterSpacing: 1.5,
    transform: [
      { rotate: "-30deg" }
    ],
  },

  capTidakSegar: {
    height: 100, 
    width: 100, 
    borderRadius: 100,
    backgroundColor: "white",
    bottom: -50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "red",
    borderStyle: "dashed",
    position: "absolute"

  },

  textCapTidakSegar: {
    fontFamily: "Google Sans",
    fontWeight: "bold",
    fontSize: 20,
    color: "red",
    letterSpacing: 1.5,
    transform: [
      { rotate: "-30deg" }
    ],
  },


});


