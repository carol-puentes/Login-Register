import React, { useState } from "react";
import { View, Text, Button, Image, TouchableOpacity } from "react-native";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { Picker } from "@react-native-picker/picker";
import YoutubePlayer from "react-native-youtube-iframe"; // 🔹 Importa el reproductor de YouTube

export default function HomeScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [playing, setPlaying] = useState(false); // 🔹 Estado para controlar la reproducción
  const [showVideo, setShowVideo] = useState(false); // 🔹 Estado para mostrar el video

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

      {/* Imagen que al tocarla muestra el video */}
      {!showVideo ? (
        <TouchableOpacity onPress={() => setShowVideo(true)} style={{ marginTop: 20 }}>
          <Image
            source={{ uri: "https://img.youtube.com/vi/VIDEO_ID/0.jpg" }} // 🔹 Reemplaza VIDEO_ID con el ID del video
            style={{ width: 300, height: 200, borderRadius: 10 }}
          />
        </TouchableOpacity>
      ) : (
        <YoutubePlayer
  height={200}
  width={300}
  play={playing}
  videoId="AdZPmob8wtE" // ✅ Tu video de YouTube
  onChangeState={(event) => {
    if (event === "ended") setShowVideo(false);
  }}
/>

      )}

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
