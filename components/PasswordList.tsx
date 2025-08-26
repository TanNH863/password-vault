import PasswordItem from "@/components/PasswordItem";
import { usePasswords } from "@/hooks/usePasswords";
import { Password } from "@/types/Passwords";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, FlatList, StyleSheet } from "react-native";

export default function PasswordList() {
  const { passwords, removePasswordInfo } = usePasswords();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleDeletePress = (id: string) => {
    Alert.alert(
      "Delete Password",
      "Are you sure you want to delete this password?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            removePasswordInfo(id);
            Alert.alert("Delete Success!");
          },
        },
      ],
      { cancelable: false }
    );
  };

  const toggleDropdown = (id: string) => {
    setSelectedItemId(selectedItemId === id ? null : id);
  };

  const handleEditPress = (item: Password) => {
    router.push({
      pathname: "edit-password/[param]",
      params: {
        param: item.id,
        pswId: item.id,
        appname: item.appname,
        username: item.username,
        password: item.password,
        category: item.category,
      },
    });
  };

  return (
    <FlatList
      data={passwords}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PasswordItem
          item={item}
          selectedItemId={selectedItemId}
          toggleDropdown={toggleDropdown}
          handleEditPress={handleEditPress}
          handleDeletePress={handleDeletePress}
        />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
});
