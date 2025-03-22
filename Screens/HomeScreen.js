import React from "react";
import { View, Text, Button } from "react-native";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

export default function HomeScreen({ navigation }) {
  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace("Login");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Bienvenido a la App</Text>
      <Button title="Cerrar Sesión" onPress={handleLogout} />
    </View>
  );
}
