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
import { signInWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-toast-message";
import Svg, { Path, Defs, LinearGradient, Stop,Circle } from "react-native-svg";


// Componente para el efecto de marco con degradado
const DynamicIslandBackground = () => {
  const { width } = Dimensions.get("window");

  return (
    <>
    <View style={{ position: "absolute", top: 0, left: 0, width, height: 150 }}>
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
          transform: [{ rotate: "180deg" }]  // Rotamos la vista
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

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Inicio de sesión exitoso",
        text2: "¡Bienvenido de nuevo!",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error al iniciar sesión",
        text2: error.message,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Agrega el efecto de marco superior */}
      <DynamicIslandBackground />

      {/* SVG del icono de usuario */}
      <Svg width={80} height={80} viewBox="0 0 24 24">
        <Circle cx="12" cy="8" r="4" stroke="black" strokeWidth="2" fill="none" />
        <Path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="black" strokeWidth="2" fill="none" />
      </Svg>

      
      <Text style={styles.title}>Iniciar Sesión</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>


      <Button
        title="Registrarse"  color="#8080ff" 
        onPress={() => navigation.navigate("Register")}
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
