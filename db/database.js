import * as SQLite from 'expo-sqlite';
import { v4 as uuidv4 } from 'uuid';

export async function setupDatabase() {
  const db = await SQLite.openDatabaseAsync('passwordinfo.db');

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS passwordinfo (
      id TEXT PRIMARY KEY NOT NULL,
      appname TEXT,
      username TEXT,
      password TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

// export async function getPasswordInfo() {
//   try {
//     const rows = await db.execAsync('SELECT * FROM passwordinfo');
//     return rows;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return [];
//   }
// }
// export function setupDatabase() {
//   db.transaction(tx => {
//     tx.executeSql(
//       `CREATE TABLE IF NOT EXISTS passwordinfo (
//         id INTEGER PRIMARY KEY NOT NULL,
//         appname TEXT,
//         username TEXT,
//         password TEXT,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       );`,
//       [],
//       () => console.log('Table created successfully'),
//       (tx, error) => console.log('Error creating table:', error)
//     );
//   });
// }

export async function getPasswordInfo() {
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

export async function insertPasswordInfo(appname, username, password) {
  // generate random id
  const id = uuidv4();

  // get current timestamp in ISO format
  const created_at = new Date().toISOString();

  try {
    // prepared statement
    const statement = await db.prepareAsync(
      'INSERT INTO passwordinfo (id, appname, username, password, created_at) VALUES ($id, $appname, $username, $password, $created_at)'
    );

    try {
      let result = await statement.executeAsync({
        $id: id,
        $appname: appname,
        $username: username,
        $password: password,
        $created_at: created_at,
      });
      console.log('Inserted data: ', result.lastInsertRowId, result.changes);
    }
    catch (executeError) {
      console.error('Error executing statement: ', executeError);
    }
    finally {
      await statement.finalizeAsync();
    }
  } catch (prepareError) {
    console.error('Error preparing statement: ', prepareError);
  }
}
