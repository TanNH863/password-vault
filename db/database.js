import * as SQLite from 'expo-sqlite';
import { PasswordInfo, SecureNotes, Documents } from '../models';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS securenotes (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT,
        content TEXT
      );
      CREATE TABLE IF NOT EXISTS documents (
        id TEXT PRIMARY KEY NOT NULL,
        filename TEXT,
        filedata BLOB
      );
    `);
    console.log('Tables created successfully');
  }
  catch (error) {
    console.log('Error creating table:', error)
  }
}

export async function insertPasswordInfo(passwordInfo) {
  // generate random id
  const id = uuidv4();

  // get current timestamp in ISO format
  const created_at = new Date().toISOString();

  const result = (await db).runAsync(
    'INSERT INTO passwordinfo (id, appname, username, password, created_at) VALUES (?, ?, ?, ?, ?)',
    [
      id,
      passwordInfo.appname,
      passwordInfo.username,
      passwordInfo.password,
      created_at
    ]
  );
  return result;
}

export async function addSecureNote(note) {
  // generate random id
  const id = uuidv4();

  const result = (await db).runAsync(
    `INSERT INTO securenotes (id, title, content) VALUES (?, ?, ?)`,
    [
      id,
      note.title,
      note.content
    ]
  );

  return result;
}

export async function addDocument(doc) {
  // generate random id
  const id = uuidv4();

  const result = (await db).runAsync(
    `INSERT INTO documents (id, filename, filepath) VALUES (?, ?, ?)`,
    [
      id,
      doc.filename,
      doc.filepath
    ]
  )

  return result;
}

export async function getPasswordInfo() {
  const passwordArray = [];
  const passwordinfos = await (await db).getAllAsync("SELECT id, appname, username, password FROM passwordinfo");

  passwordinfos.forEach((passwordInfo) => passwordArray.push(
    new PasswordInfo(
      passwordInfo.id,
      passwordInfo.appname,
      passwordInfo.username,
      passwordInfo.password,
      passwordInfo.created_at
    )
  ));

  return passwordArray;
}

export async function getSecureNotes() {
  const noteArray = [];
  const notes = await (await db).getAllAsync("SELECT id, title, content FROM securenotes");

  notes.forEach((note) => noteArray.push(
    new SecureNotes(
      note.id,
      note.title,
      note.content
    )
  ));

  return noteArray;
}

export async function getDocumentList() {
  const documentList = [];
  const documents = await (await db).getAllAsync("SELECT id, filename, filedata FROM documents");

  documents.forEach((doc) => documentList.push(
    new Documents(
      doc.id,
      doc.filename,
      doc.filedata
    )
  ));

  return documentList;
}

export async function deletePasswordInfo(id) {
  const result = (await db).runAsync('DELETE FROM passwordinfo WHERE id = ?', [id]);
  return result;
}

export async function updatePasswordInfo(id, appname, username, password) {
  const result = (await db).runAsync(`
    UPDATE passwordinfo
    SET appname = ?,
        username = ?,
        password = ?
    WHERE id = ?`,
    [appname, username, password, id]
  );
  return result;
}