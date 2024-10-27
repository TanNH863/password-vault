import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseAsync("passwordinfo");

export async function ExportDB() {
  const dbDir = `${FileSystem.documentDirectory}SQLite`;
  const dbUri = `${dbDir}/passwordinfo.db`;

  try {
    // Ensure the directory exists
    const dirInfo = await FileSystem.getInfoAsync(dbDir);

    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(dbDir, { intermediates: true });
    }

    // Share the database file
    await Sharing.shareAsync(dbUri);
  } catch (error) {
    console.error("Error exporting database:", error);
  }
}
