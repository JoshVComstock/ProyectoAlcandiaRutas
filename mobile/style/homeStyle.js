import { StyleSheet } from "react-native";

export const stylesHome = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: "rgba(151, 71, 255, 0.2)",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#6200ff",
    },
    exitButton: {
      backgroundColor: "rgba(151, 71, 255, 0.2)",
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 20,
    },
    exitButtonText: {
      color: "#6200ff",
      fontWeight: "bold",
    },
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    subtitle: {
      fontSize: 18,
      color: "#0061cf",
      marginBottom: 20,
    },
    circularButton: {
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: "#6200ff",
      justifyContent: "center",
      alignItems: "center",
      elevation: 5,
      marginBottom: 30,
    },
    startedButton: {
      backgroundColor: "#0061cf",
    },
    buttonText: {
      fontSize: 24,
      color: "white",
      fontWeight: "bold",
    },
    instructionText: {
      fontSize: 16,
      color: "#333",
      marginBottom: 10,
    },
    bottomButtons: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
      paddingVertical: 10,
      paddingHorizontal: 10,
      backgroundColor: "rgba(151, 71, 255, 0.1)",
    },
    modeButton: {
      backgroundColor: "white",
      padding: 10,
      borderRadius: 20,
      alignItems: "center",
      minWidth: 80,
      elevation: 2,
    },
    selectedModeButton: {
      backgroundColor: "#6200ff",
    },
    modeButtonText: {
      color: "#6200ff",
      fontWeight: "bold",
    },
    selectedModeButtonText: {
      color: "#fff",
    },
  });
  