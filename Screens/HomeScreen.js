import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { Picker } from "@react-native-picker/picker"; // 🔹 Asegúrate de importar Picker

export default function HomeScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace("Login");
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>{t("welcome")}</Text>
      <Button title={t("logout")} onPress={handleLogout} />

      <Text style={{ marginTop: 20 }}>{t("selectLanguage")}</Text>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue) => changeLanguage(itemValue)}
        style={{ height: 50, width: 200 }}
      >
        <Picker.Item label="Español" value="es" />
        <Picker.Item label="English" value="en" />
      </Picker>
    </View>
  );
}
