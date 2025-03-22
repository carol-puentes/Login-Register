// import React, { useState, useEffect } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./firebaseConfig"; // Asegúrate de importar bien

// import LoginScreen from "./Screens/LoginScreen";
// import HomeScreen from "./Screens/HomeScreen";
// import RegisterScreen from "./Screens/RegisterScreen"; // Agrega RegisterScreen aquí

// const Stack = createStackNavigator();

// export default function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Verifica si el usuario está autenticado
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });

//     return () => unsubscribe(); // Cleanup
//   }, []);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {user ? (
//           // Si el usuario está autenticado, navega a Home
//           <Stack.Screen name="Home" component={HomeScreen} />
//         ) : (
//           <>
//             {/* Si el usuario no está autenticado, muestra las pantallas de Login y Register */}
//             <Stack.Screen name="Login" component={LoginScreen} />
//             <Stack.Screen name="Register" component={RegisterScreen} />
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }


import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig"; // Asegúrate de importar bien

import LoginScreen from "./Screens/LoginScreen";
import HomeScreen from "./Screens/HomeScreen";
import RegisterScreen from "./Screens/RegisterScreen"; // Agrega RegisterScreen aquí

import Toast from "react-native-toast-message"; // Importa Toast

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verifica si el usuario está autenticado
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          // Si el usuario está autenticado, navega a Home
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <>
            {/* Si el usuario no está autenticado, muestra las pantallas de Login y Register */}
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
      
      {/* Aquí agregamos el componente Toast */}
      <Toast />
    </NavigationContainer>
  );
}
