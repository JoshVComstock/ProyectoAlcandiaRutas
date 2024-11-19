import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
} from "react-native";
import { useUser } from "../hook/useUser";
export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, user } = useUser();
  const handleLogin = async () => {
    if (username.trim() === "" || password.trim() === "") {
      alert("Error", "Por favor, ingresa tu usuario y contraseña.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          usuario: username,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        if (data.data) {
          alert("Inicio de sesion correcto!");
          setUser(data.data);
          navigation.navigate("Home");
        } else {
          alert("Usuario no autorizado");
        }
      } else {
        alert("Error", data.message || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Error", "Hubo un problema con la conexión al servidor.");
    }
  };
  console.log(user);
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Travel mode</Text>
      <Text style={styles.title}>Bienvenido!</Text>
      <Text style={styles.subtitle}>Por favor entrar para continuar</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Resuperar contraseña?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  logo: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#6200ff",
    textAlign: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#0061cf",
    backgroundColor: "rgba(151, 71, 255, 0.1)",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    fontSize: 16,
    color: "#333",
  },
  loginButton: {
    backgroundColor: "#6200ff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotPassword: {
    marginTop: 20,
    alignItems: "center",
  },
  forgotPasswordText: {
    color: "#0061cf",
    fontSize: 14,
  },
});
