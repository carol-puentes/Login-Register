import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig"; 

import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen"; 
import HomeScreen from "./Screens/HomeScreen";
import HelpScreen from "./Screens/HelpScreen";
import ProgressScreen from "./Screens/ProgressScreen";

import Toast from "react-native-toast-message"; 
import { useNavigation } from "@react-navigation/native";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "./i18n"; 

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 🔹 Definir el BottomTabNavigator con el botón de salir
function HomeTabs() {
  const { t } = useTranslation();
  const navigation = useNavigation(); // Hook para obtener la navegación

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      }); // Evita que el usuario vuelva atrás después de cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Ayuda" component={HelpScreen} />
      <Tab.Screen name="Progreso" component={ProgressScreen} />
      <Tab.Screen 
        name="Salir" 
        component={HomeScreen} 
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); // Evita que navegue a otra pantalla
            handleLogout(); // Llama a la función de cierre de sesión
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <I18nextProvider i18n={i18n}> 
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <Stack.Screen name="HomeTabs" component={HomeTabs} />
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </>
          )}
        </Stack.Navigator>

        <Toast />
      </NavigationContainer>
    </I18nextProvider>
  );
}
