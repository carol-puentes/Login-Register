import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import { collection, addDoc, onSnapshot, query, orderBy, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig"; // Configuración de Firebase

const HelpScreen = () => {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Obtener usuario autenticado
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      getDoc(userRef).then((userSnap) => {
        if (userSnap.exists()) {
          setUserName(userSnap.data().name);
        }
      });
    }

    // Escuchar cambios en las publicaciones
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  const handlePost = async () => {
    if (postText.trim()) {
      await addDoc(collection(db, "posts"), {
        text: postText,
        user: userName,
        timestamp: new Date(),
      });
      setPostText("");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text style={{ fontWeight: "bold" }}>{item.user || "Usuario desconocido"}</Text>
            <Text>{item.text}</Text>
            {item.timestamp?.seconds ? (
              <Text style={{ fontSize: 10, color: "gray" }}>
                {new Date(item.timestamp.seconds * 1000).toLocaleString()}
              </Text>
            ) : null}
          </View>
        )}
      />

      <TextInput
        value={postText}
        onChangeText={setPostText}
        placeholder="Escribe tu publicación"
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <Button title="Publicar" onPress={handlePost} />
    </View>
  );
};

export default HelpScreen;
