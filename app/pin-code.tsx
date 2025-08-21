import i18n from "@/constants/Translations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PINCodeSetup({
  handleFinishOnboarding = () => Promise<void>,
}) {
  const [pin, setPin] = useState("");

  const handleNumberPress = (number: number) => {
    if (pin.length < 6) {
      setPin(pin + number);
    }
  };

  const handleDeletePress = () => {
    setPin(pin.slice(0, -1));
  };

  const handleContinue = async () => {
    if (pin.length === 6) {
      await AsyncStorage.setItem("authMethod", "PIN");
      await AsyncStorage.setItem("user_pin", pin);
      console.log("PIN Code saved:", pin);
      handleFinishOnboarding();
      router.replace("/(tabs)");
    } else {
      alert("Please enter a 6-digit PIN code.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("pin_setup")}</Text>
      <View style={styles.pinContainer}>
        {Array.from({ length: 6 }).map((_, index) => (
          <View key={index} style={styles.pinCircle}>
            <Text style={styles.pinText}>{pin[index] || ""}</Text>
          </View>
        ))}
      </View>
      <View style={styles.numberPad}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "#", 0, "Delete"].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.numberButton,
              item === "#" && styles.hashButton,
              item === "Delete" && styles.deleteButton,
            ]}
            onPress={() => {
              switch (item) {
                case "Delete":
                  handleDeletePress();
                  break;
                case "#":
                  handleContinue();
                  break;
                default:
                  handleNumberPress(item.toString());
              }
            }}
          >
            <Text
              style={[
                styles.numberButtonText,
                item === "Delete" && styles.deleteButtonText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  pinContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 40,
  },
  pinCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  pinText: {
    fontSize: 24,
  },
  numberPad: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  numberButton: {
    width: "30%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  hashButton: {
    backgroundColor: "#4CAF50",
  },
  deleteButton: {
    backgroundColor: "#ff0000",
  },
  numberButtonText: {
    fontSize: 24,
  },
  deleteButtonText: {
    color: "#fff",
  },
});
