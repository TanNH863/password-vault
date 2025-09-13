import { darkTheme, lightTheme } from "@/constants/theme";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { PasswordProvider } from "@/contexts/PasswordContext";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { setupDatabase } from "@/db/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";

export default function RootLayout() {
  const { theme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const colors = theme === "dark" ? darkTheme : lightTheme;
  const tintColors = theme === "dark" ? lightTheme : darkTheme;

  useEffect(() => {
    const checkLoginStatus = async () => {
      const username = await AsyncStorage.getItem("username");
      setIsLoggedIn(!!username);
    };
    setupDatabase();
    checkLoginStatus();
  }, []);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <PasswordProvider>
          <Stack initialRouteName={isLoggedIn ? "language" : "(tabs)"}>
            <Stack.Screen name="language" options={{ headerShown: false }} />
            <Stack.Screen name="welcome" options={{ headerShown: false }} />
            <Stack.Screen name="get-info" options={{ headerShown: false }} />
            <Stack.Screen name="sign-in" options={{ headerShown: false }} />
            <Stack.Screen name="pin-code" options={{ headerShown: false }} />
            <Stack.Screen name="fingerprint" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="add-note"
              options={{
                title: "Add new note",
              }}
            />
            <Stack.Screen
              name="add-password"
              options={{
                title: "Add new password",
                headerStyle: {
                  backgroundColor: colors.headerBackground,
                },
                headerTintColor: tintColors.headerBackground,
              }}
            />
            <Stack.Screen
              name="edit-note/[param]"
              options={{ title: "Edit note item" }}
            />
            <Stack.Screen
              name="edit-password/[param]"
              options={{ title: "Edit password item" }}
            />
            <Stack.Screen
              name="note-view/[param]"
              options={{ title: "View note" }}
            />
          </Stack>
        </PasswordProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
