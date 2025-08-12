import i18n from "@/components/Translations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function GetInfoScreen() {
  const [input, setInput] = useState("");

  const handleContinue = async () => {
    if (input.trim()) {
      await AsyncStorage.setItem("username", input);
      router.replace("/sign-in");
    } else {
      alert("Please enter a valid username.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("greetings")}</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={input}
        onChangeText={setInput}
      />
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>{i18n.t("continue")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: "#0377BC",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
