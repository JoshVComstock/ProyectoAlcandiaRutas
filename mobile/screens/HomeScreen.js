import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import useGet from "../hook/useGet";
import { useUser } from "../hook/useUser";
import { stylesHome } from "../style/homeStyle";
import axios from "axios";

export default function HomeScreen({ navigation }) {
  const [isStarted, setIsStarted] = useState(false);
  const [selectedMode, setSelectedMode] = useState(null);
  const [location, setLocation] = useState(null);
  const { data } = useGet(`tipoCaminata`);
  const [IdCaminata, setIdCaminata] = useState();
  const { user, logout } = useUser();
  const [routes, setRoutes] = useState([]);
  const [currentRoute, setCurrentRoute] = useState(null);
  const [linea, setLinea] = useState("");
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert(
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
          timeInterval: 1000,
          distanceInterval: 0,
        },
        (newLocation) => {
          setLocation(newLocation);
          updateCurrentRoute(newLocation);
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

  useEffect(() => {
    if (selectedMode) {
      // Si ya hay una ruta en curso, guardarla antes de iniciar una nueva
      if (isStarted && currentRoute) {
        setRoutes((prevRoutes) => [...prevRoutes, currentRoute]);
      }

      // Iniciar una nueva ruta con el nuevo modo de transporte seleccionado
      setCurrentRoute(null); // Reiniciar la ruta actual para el nuevo modo de transporte
    }
  }, [selectedMode]);

  const updateCurrentRoute = (newLocation) => {
    const coords = [newLocation.coords.latitude, newLocation.coords.longitude];

    if (!currentRoute) {
      setCurrentRoute({
        IdTipoCaminata: IdCaminata,
        start: coords,
        middle: coords,
        end: coords,
      });
    } else {
      setCurrentRoute((prev) => ({
        ...prev,
        middle: coords,
        end: coords,
      }));
    }
  };

  const handleStart = () => {
    if (!selectedMode) {
      alert(
        "Modo no seleccionado",
        "Por favor, selecciona un modo de transporte antes de comenzar."
      );
      return;
    }
    if (isStarted) {
      if (currentRoute) {
        setRoutes((prevRoutes) => [...prevRoutes, currentRoute]);
        setCurrentRoute(null);
        enviarRutasAlServidor();
      }
    }
    setIsStarted(!isStarted);
  };

  const enviarRutasAlServidor = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:3000/usuarioRuta", {
        idUsuario: user.idUsuario,
        rutas: routes,
      });

      alert("Éxito", "Las rutas se han enviado correctamente.");
      setRoutes([]);
    } catch (error) {
      alert("Error", "No se pudieron enviar las rutas.");
      console.error("Error enviando las rutas: ", error);
    }
  };

  const handleModeSelection = (mode) => {
    setSelectedMode(mode);
    setIdCaminata(mode.id);
  };
  const handleLinea = (nombre) => {
    if (nombre == "trufi") {
      
      setLinea()
    }
  };
  if (!user) {
    return <Text>Cargando usuario...</Text>;
  }

  return (
    <SafeAreaView style={stylesHome.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={stylesHome.header}>
        <Text style={stylesHome.title}>Mi Aplicación de Transporte</Text>
        <TouchableOpacity
          style={stylesHome.exitButton}
          onPress={() => logout(navigation)}
        >
          <Text style={stylesHome.exitButtonText}>Salir</Text>
        </TouchableOpacity>
      </View>
      <View style={stylesHome.content}>
        <Text style={stylesHome.subtitle}>
          {isStarted ? "¡Viaje en progreso!" : "Listo para comenzar"}
        </Text>

        <TouchableOpacity
          style={[
            stylesHome.circularButton,
            isStarted ? stylesHome.startedButton : {},
          ]}
          onPress={handleStart}
        >
          <Text style={stylesHome.buttonText}>
            {isStarted ? "Detener" : "Comenzar"}
          </Text>
        </TouchableOpacity>

        {location && (
          <Text style={stylesHome.locationText}>
            Lat: {location.coords.latitude.toFixed(4)}, Lon:{" "}
            {location.coords.longitude.toFixed(4)}
          </Text>
        )}

        <Text style={stylesHome.instructionText}>
          Selecciona tu modo de transporte:
        </Text>
      </View>
      <View style={stylesHome.bottomButtons}>
        {data?.map((mode, index) => (
          <TouchableOpacity
            key={index}
            style={[
              stylesHome.modeButton,
              selectedMode === mode ? stylesHome.selectedModeButton : {},
            ]}
            onPress={() => handleModeSelection(mode)}
          >
            <Text
              style={[
                stylesHome.modeButtonText,
                selectedMode === mode ? stylesHome.selectedModeButtonText : {},
              ]}
            >
              {mode.nombre}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
