import i18n from "@/constants/Translations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function FingerprintSetup({
  handleFinishOnboarding = () => Promise<void>,
}) {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  // Check if biometric authentication is available
  useEffect(() => {
    const checkBiometricSupport = async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
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
      Alert.alert(
        "Authentication Successful",
        "You have successfully set up fingerprint authentication."
      );
      handleFinishOnboarding();
      router.replace("/(tabs)");
    } else {
      Alert.alert("Authentication Failed", "Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("fingerprint")}</Text>
      {isBiometricSupported ? (
        <TouchableOpacity
          style={styles.fingerprintButton}
          onPress={handleFingerprintSetup}
        >
          <Text style={styles.fingerprintButtonText}>
            {i18n.t("fingerprint_setup")}
          </Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.errorText}>{i18n.t("fingerprint_error")}</Text>
      )}
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
  fingerprintButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  fingerprintButtonText: {
    fontSize: 18,
    color: "#fff",
  },
  errorText: {
    fontSize: 18,
    color: "#ff0000",
  },
});
