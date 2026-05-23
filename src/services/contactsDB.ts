import type { Contact } from '../models/Contact';
import { getDB } from './indexdDB';

const CONTACT_STORE = 'contacts';

export const ensureContactStore = async () => {
  const db = await getDB();
  if (!db.objectStoreNames.contains(CONTACT_STORE)) {
    db.close();
  }
  return db;
};

export const addContact = async (contact: Omit<Contact, 'id'>) => {
  const db = await getDB();
  return db.add(CONTACT_STORE, contact);
};

export const getContactsByOwner = async (ownerUsername: string): Promise<Contact[]> => {
  const db = await getDB();
  const tx = db.transaction(CONTACT_STORE, 'readonly');
  const store = tx.objectStore(CONTACT_STORE);
  const contacts = (await store.getAll()) as Contact[];
  await tx.done;

  return contacts
    .filter((contact) => contact.ownerUsername === ownerUsername)
    .sort((a, b) => b.id - a.id);
};

export const updateContact = async (contact: Contact) => {
  const db = await getDB();
  return db.put(CONTACT_STORE, contact);
};

export const deleteContact = async (id: number) => {
  const db = await getDB();
  return db.delete(CONTACT_STORE, id);
};