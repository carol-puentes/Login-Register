// import React, { useState, useEffect } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./firebaseConfig"; 

// import LoginScreen from "./Screens/LoginScreen";
// import HomeScreen from "./Screens/HomeScreen";
// import RegisterScreen from "./Screens/RegisterScreen"; 

// import Toast from "react-native-toast-message"; 

// // 🔹 Importar i18n para la traducción
// import "./i18n"; 
// import { I18nextProvider } from "react-i18next";
// import i18n from "./i18n"; 

// const Stack = createStackNavigator();

// export default function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });

//     return () => unsubscribe(); 
//   }, []);

//   return (
    
//     // 🔹 Envolver la app con I18nextProvider
//     <I18nextProvider i18n={i18n}> 
//       <NavigationContainer>
//         <Stack.Navigator>
//           {user ? (
//             <Stack.Screen name="Home" component={HomeScreen} />
//           ) : (
//             <>
//               <Stack.Screen name="Login" component={LoginScreen} />
//               <Stack.Screen name="Register" component={RegisterScreen} />
//             </>
//           )}
//         </Stack.Navigator>

//         {/* 🔹 Componente Toast */}
//         <Toast />
//       </NavigationContainer>
//     </I18nextProvider>
//   );
// }

import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig"; 

import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen"; 
import HomeScreen from "./Screens/HomeScreen";
import HelpScreen from "./Screens/HelpScreen";
import ProgressScreen from "./Screens/ProgressScreen";

import Toast from "react-native-toast-message"; 
import "./i18n"; 
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n"; 

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 🔹 Definir el BottomTabNavigator (Solo se mostrará cuando el usuario haya iniciado sesión)
function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Ayuda" component={HelpScreen} />
      <Tab.Screen name="Progreso" component={ProgressScreen} />
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
