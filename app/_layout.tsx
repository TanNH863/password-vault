import { setupDatabase } from "@/db/database";
import { Stack } from "expo-router";
import React, { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    setupDatabase();
  });

  return (
    <Stack initialRouteName="language">
      <Stack.Screen name="language" options={{ headerShown: false }} />
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="get-info" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="pin-code" options={{ headerShown: false }} />
      <Stack.Screen name="fingerprint" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="add-note" />
      <Stack.Screen name="add-password" />
      <Stack.Screen name="edit-note/[param]" />
      <Stack.Screen name="edit-password/[param]" />
      <Stack.Screen name="note-view/[param]" />
    </Stack>
  );
}
