import BottomSheet from "@/components/BottomSheet";
import ModalButton from "@/components/ModalButton";
import SettingsButton from "@/components/SettingsButton";
import SettingsSwitch from "@/components/SettingsSwitch";
import { darkTheme, lightTheme } from "@/constants/theme";
import { PasswordContext } from "@/contexts/PasswordContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useNotes } from "@/hooks/useNotes";
import { usePasswords } from "@/hooks/usePasswords";
import {
  NoteBackup,
  NoteRestore,
  PasswordBackup,
  PasswordRestore,
} from "@/utils/backup-restore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import React, { useContext, useEffect, useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import packageJson from "../../package.json";

export default function SettingScreen() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { setPasswordVisibility } = useContext(PasswordContext);
  const { passwords, reload } = usePasswords();
  const { notes } = useNotes();
  const { theme, toggleTheme } = useTheme();

  const [pin, setPin] = useState("");
  const [open, setOpen] = useState(false);
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
    // still checking on toggle off
    // textinput not clearing on toggle on bottom sheet
    const storedPin = await AsyncStorage.getItem("user_pin");
    if (pin === storedPin) {
      togglePasswordVisibility();
      setOpen(false);
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
        setOpen(true);
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
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
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
        onPress={() => PasswordBackup(passwords)}
      />
      <SettingsButton label="Backup Notes" onPress={() => NoteBackup(notes)} />
      <SettingsButton
        label="Restore Passwords"
        onPress={() => PasswordRestore(reload)}
      />
      <SettingsButton
        label="Restore Notes"
        onPress={() => NoteRestore(reload)}
      />
      <BottomSheet visible={open} onClose={() => setOpen(false)}>
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
        <ModalButton label="Submit" onPress={checkPIN} />
        <ModalButton label="Cancel" onPress={() => setOpen(false)} />
      </BottomSheet>
      <View style={{ flex: 1 }} />
      <Text
        style={{
          color: colors.text,
          textAlign: "center",
          paddingBottom: 10,
        }}
      >
        Version: {packageJson.version}
      </Text>
    </SafeAreaView>
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
    alignSelf: "center",
    fontSize: 18,
    marginBottom: 20,
  },
  pinInput: {
    alignSelf: "center",
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