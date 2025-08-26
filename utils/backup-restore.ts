import { addNote, insertPasswordInfo } from "@/db/database";
import { Note } from "@/types/Note";
import { Password } from "@/types/Passwords";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export async function PasswordBackup(passwords: Password[]) {
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

export async function NoteBackup(notes: Note[]) {
  try {
    const json = JSON.stringify(notes);
    const backupFilePath = `${FileSystem.documentDirectory}notes_backup.json`;

    await FileSystem.writeAsStringAsync(backupFilePath, json);

    await Sharing.shareAsync(backupFilePath, {
      mimeType: "application/json",
      dialogTitle: "Backup Notes",
    });

    console.log("Backup successful:", backupFilePath);
  } catch (error) {
    console.error("Backup failed:", error);
  }
}

export async function PasswordRestore(loadPasswordInfo: () => void) {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/json",
    });
    if (result.assets && result.assets.length > 0) {
      const fileContents = await FileSystem.readAsStringAsync(
        result.assets[0].uri
      );
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

export async function NoteRestore(loadNotes: () => void) {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/json",
    });

    if (result.assets && result.assets.length > 0) {
      const fileContents = await FileSystem.readAsStringAsync(
        result.assets[0].uri
      );
      const notes = JSON.parse(fileContents);

      for (const note of notes) {
        await addNote(note);
      }

      loadNotes();

      console.log("Restore successful");
    }
  } catch (error) {
    console.error("Restore failed:", error);
  }
}
