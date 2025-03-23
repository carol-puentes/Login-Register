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
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-toast-message"; // Importa Toast
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  Circle,
} from "react-native-svg";

// Componente para el efecto de marco con degradado
const DynamicIslandBackground = () => {
  const { width } = Dimensions.get("window");

  return (
    <>
      <View
        style={{ position: "absolute", top: 0, left: 0, width, height: 250 }}
      >
        <Svg width={width} height={250} viewBox={`0 0 ${width} 250`}>
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="10%" stopColor="#fff7ad" />
              <Stop offset="100%" stopColor="#ffa9f9" />
            </LinearGradient>
          </Defs>

          {/* SECION FORMA  */}
          <Path
            d={`
                    M0,250  
                    Q${width * 0.25},125 ${width * 0.5},160  
                    Q${width * 0.75},190 ${width},125  
                    L${width},0  
                    L0,0  
                    Z
                  `}
            fill="url(#grad)"
          />
        </Svg>
      </View>

      {/* Fondo en la parte inferior (rotado 180°) */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width,
          height: 150,
          transform: [{ rotate: "180deg" }], // Rotamos la vista
        }}
      >
        <Svg width={width} height={150} viewBox={`0 0 ${width} 150`}>
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="10%" stopColor="#fff7ad" />
              <Stop offset="100%" stopColor="#ffa9f9" />
            </LinearGradient>
          </Defs>

          <Path
            d={`
              M0,150  
              Q${width * 0.25},50 ${width * 0.5},80  
              Q${width * 0.75},120 ${width},90  
              L${width},0  
              L0,0  
              Z
            `}
            fill="url(#grad)"
          />
        </Svg>
      </View>
    </>
  );
};

export default function RegisterScreen({ navigation }) {
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
      <DynamicIslandBackground />

      {/* SVG del icono de usuario */}
      <Svg width={80} height={80} viewBox="0 0 24 24">
        {/* Cabeza del usuario */}
        <Circle
          cx="12"
          cy="8"
          r="4"
          stroke="black"
          strokeWidth="2"
          fill="none"
        />

        {/* Cuerpo del usuario */}
        <Path
          d="M4 20c0-4 4-6 8-6s8 2 8 6"
          stroke="black"
          strokeWidth="2"
          fill="none"
        />

        {/* Signo de + (para indicar registro) */}
        <Path
          d="M19 10h4m-2-2v4"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </Svg>

      <Text style={styles.title}>Registro de cuenta</Text>
      
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
       {/* Botón Personalizado */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>

        <Button
          title="Ingreso"  color="#8080ff" 
          onPress={() => navigation.navigate("Login")}
        />

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
    justifyContent: "center",
    width: "80%",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
