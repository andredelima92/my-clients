import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
  Button,
} from "react-native";
import api from "./services/api";

export default function App() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    api.get("clients").then(({ data }) => {
      setClients(data);
    });
  }, []);

  async function handleAddClient() {
    const { data } = await api.post("clients", {
      name: "Novo cliente" + Date.now(),
    });

    setClients([...clients, data]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={clients}
          keyExtractor={(client) => client.id}
          renderItem={({ item: client }) => (
            <Text style={styles.title}>{client.name}</Text>
          )}
        />

        <Button onPress={handleAddClient} title="Adicionar" />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
