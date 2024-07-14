import * as SQLite from 'expo-sqlite';
import { PasswordInfo } from '../models/PasswordInfo';
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
    `);
    console.log('Table created successfully');
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

export async function getPasswordInfo() {
  const passwordArray = [];
  const passwordinfos = await (await db).getAllAsync("SELECT * FROM passwordinfo");

  passwordinfos.forEach((passwordInfo) => passwordArray.push(
    new PasswordInfo(
      passwordInfo.appname,
      passwordInfo.username,
      passwordInfo.password,
    )
  ));

  return passwordArray;
}