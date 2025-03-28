import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
  Dimensions,
} from "react-native";
import { auth, db } from "../firebaseConfig"; // Importamos db para Firestore
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Firestore
import Toast from "react-native-toast-message"; 
import Svg, { Path, Defs, LinearGradient, Stop, Circle } from "react-native-svg";

// Componente para el fondo con degradado
const DynamicIslandBackground = () => {
  const { width } = Dimensions.get("window");
  return (
    <>
      <View style={{ position: "absolute", top: 0, left: 0, width, height: 250 }}>
        <Svg width={width} height={250} viewBox={`0 0 ${width} 250`}>
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="10%" stopColor="#fff7ad" />
              <Stop offset="100%" stopColor="#ffa9f9" />
            </LinearGradient>
          </Defs>
          <Path
            d={`M0,250 Q${width * 0.25},125 ${width * 0.5},160 Q${width * 0.75},190 ${width},125 L${width},0 L0,0 Z`}
            fill="url(#grad)"
          />
        </Svg>
      </View>
    </>
  );
};

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState(""); // Nuevo campo de nombre
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name.trim()) {
      Toast.show({ type: "error", text1: "El nombre no puede estar vacío." });
      return;
    }
    if (password.length < 6) {
      Toast.show({ type: "error", text1: "La contraseña debe tener al menos 6 caracteres." });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar el nombre en Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
      });

      Toast.show({ type: "success", text1: "Registro exitoso", text2: "¡Bienvenido!" });
      navigation.navigate("Login"); // Redirigir al login
    } catch (error) {
      Toast.show({ type: "error", text1: "Error al registrar usuario", text2: error.message });
    }
  };

  return (
    <View style={styles.container}>
      <DynamicIslandBackground />
      <Text style={styles.title}>Registro de cuenta</Text>

      <TextInput style={styles.input} placeholder="Nombre" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Correo electrónico" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <Button title="Ingresar" color="#8080ff" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
  input: { width: "80%", padding: 10, borderWidth: 1, marginBottom: 10 },
  button: {
    backgroundColor: "#8080ff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
    marginBottom: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
