import SettingsButton from "@/components/SettingsButton";
import SettingsSwitch from "@/components/SettingsSwitch";
import { darkTheme, lightTheme } from "@/constants/theme";
import { PasswordContext } from "@/contexts/PasswordContext";
import { useTheme } from "@/contexts/ThemeContext";
import { usePasswords } from "@/hooks/usePasswords";
import { Backup, Restore } from "@/utils/backup-restore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingScreen() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { setPasswordVisibility } = useContext(PasswordContext);
  const { passwords, reload } = usePasswords();
  const { theme, toggleTheme } = useTheme();

  const [pin, setPin] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [authMethod, setAuthMethod] = useState<string | null>("");

  const colors = theme === "dark" ? darkTheme : lightTheme;

  // Load the authentication method from storage when the component mounts
  useEffect(() => {
    const loadAuthMethod = async () => {
      const method = await AsyncStorage.getItem("authMethod");
      setAuthMethod(method);
    };
    loadAuthMethod();
  }, []);

  const checkPIN = async () => {
    const storedPin = await AsyncStorage.getItem("user_pin");
    if (pin === storedPin) {
      togglePasswordVisibility();
      setIsModalVisible(false);
    } else {
      Alert.alert("Incorrect PIN", "The PIN you entered is incorrect.");
    }
  };

  const authenticateWithFingerprint = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (hasHardware && isEnrolled) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to view passwords",
      });

      if (result.success) {
        togglePasswordVisibility();
      } else {
        Alert.alert(
          "Authentication Failed",
          "Failed to authenticate using fingerprint."
        );
      }
    } else {
      Alert.alert(
        "Fingerprint Unavailable",
        "Fingerprint authentication is not available on this device."
      );
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
    setPasswordVisibility(!isPasswordVisible);
  };

  const handleShowPasswordToggle = () => {
    switch (authMethod) {
      case "PIN":
        setIsModalVisible(true);
        break;
      case "Fingerprint":
        authenticateWithFingerprint();
        break;
      default:
        console.error("Invalid auth method");
        break;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SettingsSwitch
        label="Show Passwords"
        value={isPasswordVisible}
        onValueChange={handleShowPasswordToggle}
      />
      <SettingsSwitch
        label="Dark Mode"
        value={theme === "dark"}
        onValueChange={toggleTheme}
      />
      <SettingsButton
        label="Backup Passwords"
        onPress={() => Backup(passwords)}
      />
      <SettingsButton
        label="Restore Passwords"
        onPress={() => Restore(reload)}
      />
      <Modal visible={isModalVisible} animationType="slide">
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: colors.modalBackground },
          ]}
        >
          <Text style={[styles.modalTitle, { color: colors.text }]}>
            Enter PIN to Show Passwords
          </Text>
          <TextInput
            value={pin}
            onChangeText={setPin}
            keyboardType="numeric"
            secureTextEntry
            maxLength={6}
            style={[
              styles.pinInput,
              { color: colors.text, borderBottomColor: colors.text },
            ]}
          />
          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: colors.primary }]}
            onPress={checkPIN}
          >
            <Text
              style={[styles.modalButtonText, { color: colors.buttonText }]}
            >
              Submit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: colors.secondary }]}
            onPress={() => setIsModalVisible(false)}
          >
            <Text style={[styles.modalButtonText, { color: colors.text }]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  pinInput: {
    borderBottomWidth: 1,
    width: 150,
    textAlign: "center",
    marginBottom: 20,
    fontSize: 24,
    padding: 10,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
    width: "50%",
  },
  modalButtonText: {
    fontSize: 16,
  },
});
