import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-toast-message"; // Importa Toast

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (password.length < 6) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "La contraseña debe tener al menos 6 caracteres.",
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Registro exitoso",
        text2: "¡Bienvenido a la aplicación!",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error al registrar usuario",
        text2: error.message,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de cuenta</Text>
      <Text style={styles.description}>Crea una cuenta para explorar nuestro sitio</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Registrar" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor:"#cce6cc" },
  title: { fontSize: 24, marginBottom: 20, color:"#198d19"},
  input: { width: "80%", padding: 10, borderWidth: 1, marginBottom: 10 },
});

