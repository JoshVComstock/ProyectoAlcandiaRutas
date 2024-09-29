import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function HomeScreen({ navigation }) {
  const [isStarted, setIsStarted] = useState(false);
  const [selectedMode, setSelectedMode] = useState(null);
  const [location, setLocation] = useState(null);

  const transportModes = ["Caminar", "Bicicleta", "Moto", "Taxi"];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permiso denegado",
          "Necesitamos permiso para acceder a tu ubicación."
        );
        return;
      }
    })();
  }, []);

  useEffect(() => {
    let locationSubscription;

    if (isStarted) {
      locationSubscription = Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (newLocation) => {
          setLocation(newLocation);
          saveLocationToFirebase(newLocation);
        }
      );
    } else if (locationSubscription) {
        locationSubscription.then((subscription) => subscription.remove());
    }

    return () => {
      if (locationSubscription) {
        locationSubscription.then((subscription) => subscription.remove());
    }
    };
  }, [isStarted]);

  const saveLocationToFirebase = async (newLocation) => {
    try {
      await addDoc(collection(db, "locations"), {
        latitude: newLocation.coords.latitude,
        longitude: newLocation.coords.longitude,
        timestamp: serverTimestamp(),
        transportMode: selectedMode,
      });
    } catch (error) {
      console.error("Error saving location to Firebase:", error);
    }
  };

  const handleStart = () => {
    if (!selectedMode) {
      Alert.alert(
        "Modo no seleccionado",
        "Por favor, selecciona un modo de transporte antes de comenzar."
      );
      return;
    }
    setIsStarted(!isStarted);
  };

  const handleModeSelection = (mode) => {
    setSelectedMode(mode);
  };

  const handleExit = () => {
    if (isStarted) {
      Alert.alert(
        "Viaje en progreso",
        "¿Estás seguro de que quieres salir? El rastreo de ubicación se detendrá.",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Salir", onPress: () => navigation.navigate("Login") },
        ]
      );
    } else {
      navigation.navigate("Login");
    }
  };
  console.log(location)
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <Text style={styles.title}>Mi Aplicación de Transporte</Text>
        <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
          <Text style={styles.exitButtonText}>Salir</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>
          {isStarted ? "¡Viaje en progreso!" : "Listo para comenzar"}
        </Text>

        <TouchableOpacity
          style={[styles.circularButton, isStarted ? styles.startedButton : {}]}
          onPress={handleStart}
        >
          <Text style={styles.buttonText}>
            {isStarted ? "Detener" : "Comenzar"}
          </Text>
        </TouchableOpacity>

        {location && (
          <Text style={styles.locationText}>
            Lat: {location.coords.latitude.toFixed(4)}, Lon:{" "}
            {location.coords.longitude.toFixed(4)}
          </Text>
        )}

        <Text style={styles.instructionText}>
          Selecciona tu modo de transporte:
        </Text>
      </View>

      <View style={styles.bottomButtons}>
        {transportModes.map((mode, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.modeButton,
              selectedMode === mode ? styles.selectedModeButton : {},
            ]}
            onPress={() => handleModeSelection(mode)}
          >
            <Text
              style={[
                styles.modeButtonText,
                selectedMode === mode ? styles.selectedModeButtonText : {},
              ]}
            >
              {mode}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
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
    width: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
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
