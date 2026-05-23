import { openDB } from 'idb';
import type { User } from '../models/User';

const DB_NAME = 'contactosDB';
const DB_VERSION = 2;
const USER_STORE = 'users';
const CONTACT_STORE = 'contacts';

export const getDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(USER_STORE)) {
        db.createObjectStore(USER_STORE, { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(CONTACT_STORE)) {
        db.createObjectStore(CONTACT_STORE, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
}

export const addUser = async (user: Omit<User, 'id'>) => {
  const db = await getDB();
  return db.add(USER_STORE, user);
}

export const getUserByUsername = async (username: string): Promise<User | undefined> => {
  const db = await getDB();
  let result: User | undefined;
  const tx = db.transaction(USER_STORE, 'readonly');
  const store = tx.objectStore(USER_STORE);
  let cursor = await store.openCursor();
  while (cursor) {
    if (cursor.value.username === username) {
      result = cursor.value as User;
      break;
    }
    cursor = await cursor.continue();
  }
  await tx.done;
  return result;
}