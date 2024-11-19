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
      justifyContent: "center", 
      flexWrap: "wrap",
      gap: 12, 
      paddingVertical: 16,
      paddingHorizontal: 16,
    
    },
    modeButton: {
      backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    minWidth: 100,
    borderWidth: 1,
    borderColor: "rgba(98, 0, 255, 0.1)", // Borde sutil
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    },
    selectedModeButton: {
      backgroundColor: "#6200ff",
      borderColor: "#6200ff",
    },
    modeButtonText: {
      color: "#6200ff",
    fontSize: 14,
    fontWeight: "600",
    },
    selectedModeButtonText: {
      color: "#fff",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: "80%",
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 20,
      alignItems: "center",
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    modalInput: {
      width: "100%",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      padding: 10,
      marginBottom: 20,
      textAlign: "center",
    },
    modalButtons: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
    },
    modalButton: {
      backgroundColor: "#007BFF",
      padding: 10,
      borderRadius: 5,
      marginHorizontal: 5,
    },
    modalButtonText: {
      color: "#fff",
      fontWeight: "bold",
    },
    
  });
  