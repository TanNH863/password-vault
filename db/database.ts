import { Note } from "@/types/Note";
import { Password } from "@/types/Passwords";
import * as SQLite from "expo-sqlite";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const db = SQLite.openDatabaseAsync("passwordinfo");

export async function setupDatabase() {
  try {
    (await db).execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS passwordinfo (
        id TEXT PRIMARY KEY NOT NULL,
        appname TEXT,
        username TEXT,
        password TEXT,
        category TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS securenotes (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT,
        content TEXT,
        category TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ); 
    `);
    console.log("Tables created successfully");
  } catch (error) {
    console.log("Error creating table:", error);
  }
}

export async function insertPasswordInfo(passwordInfo: Password) {
  // get current timestamp in ISO format
  const created_at = new Date().toISOString();

  const result = (await db).runAsync(
    "INSERT INTO passwordinfo (id, appname, username, password, category, created_at) VALUES (?, ?, ?, ?, ?, ?)",
    [
      passwordInfo.id,
      passwordInfo.appname,
      passwordInfo.username,
      passwordInfo.password,
      passwordInfo.category,
      created_at,
    ]
  );
  return result;
}

export async function addNote(note: Note) {
  // generate random id
  const id = uuidv4();

  // get current timestamp in ISO format
  const created_at = new Date().toISOString();

  const result = (await db).runAsync(
    `INSERT INTO securenotes (id, title, content, category, created_at) VALUES (?, ?, ?, ?, ?)`,
    [id, note.title, note.content, note.category, created_at]
  );

  return result;
}

export async function getPasswordInfo() {
  const passwordArray: Array<Password> = [];
  const passwordinfos = await (
    await db
  ).getAllAsync("SELECT * FROM passwordinfo");

  passwordinfos.forEach((passwordInfo: any) =>
    passwordArray.push(
      new Password(
        passwordInfo.id,
        passwordInfo.appname,
        passwordInfo.username,
        passwordInfo.password,
        passwordInfo.category,
        passwordInfo.created_at
      )
    )
  );

  return passwordArray;
}

export async function getAllNotes() {
  const noteArray: Array<Note> = [];
  const notes = await (await db).getAllAsync("SELECT * FROM securenotes");

  notes.forEach((note: any) =>
    noteArray.push(
      new Note(
        note.id,
        note.title,
        note.content,
        note.category,
        note.created_at
      )
    )
  );

  return noteArray;
}

export async function deletePasswordInfo(id: string) {
  const result = (await db).runAsync("DELETE FROM passwordinfo WHERE id = ?", [
    id,
  ]);
  return result;
}

export async function deleteNote(id: string) {
  const result = (await db).runAsync("DELETE FROM securenotes WHERE id = ?", [
    id,
  ]);
  return result;
}

export async function updatePasswordInfo(
  id: string,
  appname: string,
  username: string,
  password: string,
  category: string
) {
  // get current timestamp in ISO format
  const created_at = new Date().toISOString();

  const result = (await db).runAsync(
    `
    UPDATE passwordinfo
    SET appname = ?,
        username = ?,
        password = ?,
        category = ?,
        created_at = ?
    WHERE id = ?`,
    [appname, username, password, category, created_at, id]
  );
  return result;
}

export async function updateNote(
  id: string,
  title: string,
  content: string,
  category: string,
  created_at: string
) {
  const result = (await db).runAsync(
    `
    UPDATE securenotes
    SET title = ?,
        content = ?,
        category = ?,
        created_at = ?
    WHERE id = ?`,
    [title, content, category, created_at, id]
  );
  return result;
}
