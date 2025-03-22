// import React, { useState } from "react";
// import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
// import { auth } from "../firebaseConfig";
// import { signInWithEmailAndPassword } from "firebase/auth";

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       Alert.alert("Inicio de sesión exitoso");
//     } catch (error) {
//       Alert.alert("Error al iniciar sesión", error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Iniciar Sesión</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Correo electrónico"
//         value={email}
//         onChangeText={setEmail}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Contraseña"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <Button title="Ingresar" onPress={handleLogin} />
//       <Button title="Registrarse" onPress={() => navigation.navigate("Register")} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({

//   container: { flex: 1, justifyContent: "center", alignItems: "center" },
//   title: { fontSize: 24, marginBottom: 20 },
//   input: { width: "80%", padding: 10, borderWidth: 1, marginBottom: 10 },
// });


import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-toast-message"; // Importa Toast

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Toast.show({
        type: "success", // Tipo de alerta
        position: "bottom", // Posición de la alerta
        text1: "Inicio de sesión exitoso", // Título
        text2: "¡Bienvenido de nuevo!", // Subtítulo
      });
    } catch (error) {
      Toast.show({
        type: "error", // Tipo de alerta
        position: "bottom",
        text1: "Error al iniciar sesión",
        text2: error.message,
      });
    }
  };

  return (
    <View style={styles.container}>
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
      <Button title="Ingresar" onPress={handleLogin} />
      <Button title="Registrarse" onPress={() => navigation.navigate("Register")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
  input: { width: "80%", padding: 10, borderWidth: 1, marginBottom: 10 },
});
