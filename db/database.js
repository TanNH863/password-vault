import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('passwordinfo.db');

export function setupDatabase() {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS passwordinfo (
        id INTEGER PRIMARY KEY NOT NULL,
        appname TEXT,
        username TEXT,
        password TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`,
      [],
      () => console.log('Table created successfully'),
      (tx, error) => console.log('Error creating table:', error)
    );
  });
}

export function getPasswordInfo() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM passwordinfo',
        [],
        (_, { rows: { _array } }) => resolve(_array),
        (tx, error) => reject(error)
      );
    });
  });
}

export function insertPasswordInfo(appname, username, password) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO passwordinfo (appname, username, password) VALUES (?, ?, ?)',
        [appname, username, password],
        (_, result) => resolve(result),
        (tx, error) => reject(error)
      );
    });
  });
}