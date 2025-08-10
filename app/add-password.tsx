import { darkTheme, lightTheme } from "@/components/theme";
import { useTheme } from "@/contexts/ThemeContext";
import { usePasswords } from "@/hooks/usePasswords";
import { Password } from "@/types/Passwords";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export default function AddPasswordScreen() {
  const { reload, addPasswordInfo } = usePasswords();
  const [appname, setAppname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [strength, setStrength] = useState(0);
  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const generatePassword = (length = 12) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
  };

  const checkPasswordStrength = (password: string) => {
    let strength = 0;

    if (password.length > 7) strength += 1; // At least 8 characters
    if (password.match(/[A-Z]/)) strength += 1; // Has uppercase letter
    if (password.match(/[0-9]/)) strength += 1; // Has a number
    if (password.match(/[^a-zA-Z0-9]/)) strength += 1; // Has special character

    return strength;
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setStrength(checkPasswordStrength(text));
  };

  const getStrengthLabel = () => {
    switch (strength) {
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Strong";
      case 4:
        return "Very Strong";
      default:
        return "Too Short";
    }
  };

  const getStrengthColor = () => {
    switch (strength) {
      case 1:
        return "red";
      case 2:
        return "brown";
      case 3:
        return "orange";
      case 4:
        return "green";
      default:
        return "gray";
    }
  };

  const handleSave = async () => {
    // generate random id
    const id = uuidv4();

    // get current timestamp in ISO format
    const created_at = new Date().toISOString();

    if (!appname || !username || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }
    try {
      let passwordInfo = new Password(
        id,
        appname,
        username,
        password,
        category,
        created_at
      );
      await addPasswordInfo(passwordInfo);
      Alert.alert("Success", "Info added successfully");
      reload();
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to add info");
      console.error("Error adding info: ", error);
    }
  };

  const handleGeneratePassword = () => {
    const newPassword = generatePassword();
    setPassword(newPassword);
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <Text style={[styles.label, { color: colors.text }]}>
        App or Site Name
      </Text>
      <TextInput
        style={[styles.input, { color: colors.text }]}
        value={appname}
        onChangeText={setAppname}
      />
      <Text style={[styles.label, { color: colors.text }]}>Username</Text>
      <TextInput
        style={[styles.input, { color: colors.text }]}
        value={username}
        onChangeText={setUsername}
      />
      <Text style={[styles.label, { color: colors.text }]}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.passwordInput, { color: colors.text }]}
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={!isVisible}
        />
        <TouchableOpacity
          style={styles.eyeContainer}
          onPress={() => setIsVisible(!isVisible)}
        >
          <Ionicons
            name={isVisible ? "eye" : "eye-off"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <Text style={{ color: getStrengthColor() }}>{getStrengthLabel()}</Text>

      <Text style={styles.label}>Category</Text>
      <TextInput
        style={[styles.input, { color: colors.text }]}
        value={category}
        onChangeText={setCategory}
      />

      <View style={styles.functionButtonContainer}>
        <TouchableOpacity
          style={[styles.functionButton, { backgroundColor: colors.primary }]}
          onPress={handleGeneratePassword}
        >
          <Text
            style={[styles.functionButtonText, { color: colors.buttonText }]}
          >
            Auto Generate Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.functionButton, { backgroundColor: colors.primary }]}
          onPress={handleSave}
        >
          <Text
            style={[styles.functionButtonText, { color: colors.buttonText }]}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginTop: 1,
  },
  eyeContainer: {
    padding: 8,
  },
  functionButtonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: 100,
  },
  functionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  functionButtonText: {
    fontSize: 18,
  },
});
