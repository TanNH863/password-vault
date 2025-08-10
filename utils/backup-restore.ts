import { insertPasswordInfo } from "@/db/database";
import { Password } from "@/types/Passwords";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export async function Backup(passwords: Password[]) {
  try {
    const json = JSON.stringify(passwords);
    const backupFilePath = `${FileSystem.documentDirectory}passwords_backup.json`;

    await FileSystem.writeAsStringAsync(backupFilePath, json);

    await Sharing.shareAsync(backupFilePath, {
      mimeType: "application/json",
      dialogTitle: "Backup Passwords",
    });

    console.log("Backup successful:", backupFilePath);
  } catch (error) {
    console.error("Backup failed:", error);
  }
}

export async function Restore(loadPasswordInfo) {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/json",
    });

    if (result.type === "success") {
      const fileContents = await FileSystem.readAsStringAsync(result.uri);
      const passwords = JSON.parse(fileContents);

      for (const password of passwords) {
        await insertPasswordInfo(password);
      }

      loadPasswordInfo();

      console.log("Restore successful");
    }
  } catch (error) {
    console.error("Restore failed:", error);
  }
}
