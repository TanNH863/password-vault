import i18n from "@/constants/Translations";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function FingerprintSetup({
  handleFinishOnboarding = () => Promise<void>,
}) {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if biometric authentication is available
  useEffect(() => {
    const checkBiometricSupport = async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
      setLoading(false);
    };
    checkBiometricSupport();
  }, []);

  const handleFingerprintSetup = async () => {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics) {
      return Alert.alert(
        "Biometric Record Not Found",
        "Please ensure you have set up biometrics in your device settings."
      );
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate",
      cancelLabel: "Cancel",
      fallbackLabel: "Enter Password",
    });

    if (result.success) {
      await AsyncStorage.setItem("authMethod", "Fingerprint");
      Alert.alert("Success", "Fingerprint authentication is now enabled.");
      handleFinishOnboarding();
      router.replace("/(tabs)");
    } else {
      Alert.alert("Authentication Failed", "Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons
          name="finger-print"
          size={64}
          color="#4CAF50"
          style={{ marginBottom: 20 }}
        />
        <Text style={styles.title}>{i18n.t("fingerprint")}</Text>
        <Text style={styles.subtitle}>{i18n.t("fingerprint_subtitle")}</Text>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#4CAF50"
            style={{ marginTop: 20 }}
          />
        ) : isBiometricSupported ? (
          <TouchableOpacity
            style={styles.fingerprintButton}
            onPress={handleFingerprintSetup}
            activeOpacity={0.8}
          >
            <Ionicons
              name="lock-closed"
              size={24}
              color="#fff"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.fingerprintButtonText}>
              {i18n.t("fingerprint_setup")}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.errorText}>{i18n.t("fingerprint_error")}</Text>
        )}
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
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  fingerprintButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
  },
  fingerprintButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  errorText: {
    fontSize: 16,
    color: "#E53935",
    textAlign: "center",
    marginTop: 20,
  },
});
