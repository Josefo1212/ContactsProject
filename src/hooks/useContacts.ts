import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import { addContact, deleteContact, getContactsByOwner, updateContact } from '../services/contactsDB';
import { EMPTY_CONTACT_FORM, type Contact, type ContactFormValues } from '../models/Contact';

const normalize = (value: string) => value.trim().toLowerCase();

const buildNextContactNumber = (contacts: Contact[]) => {
  const existingNumbers = contacts
    .map((contact) => Number.parseInt(contact.numero, 10))
    .filter((value) => Number.isFinite(value));

  const nextNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;
  return String(nextNumber).padStart(3, '0');
};

export const useContacts = (ownerUsername: string) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [form, setForm] = useState<ContactFormValues>(EMPTY_CONTACT_FORM);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadContacts = async () => {
    const items = await getContactsByOwner(ownerUsername);
    setContacts(items);
  };

  useEffect(() => {
    void loadContacts();
  }, [ownerUsername]);

  const filteredContacts = useMemo(() => {
    const query = normalize(search);

    if (!query) {
      return contacts;
    }

    return contacts.filter((contact) => {
      return [contact.numero, contact.nombre, contact.apellido, contact.telefono, contact.apodo, contact.nota]
        .join(' ')
        .toLowerCase()
        .includes(query);
    });
  }, [contacts, search]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const resetForm = () => {
    setForm(EMPTY_CONTACT_FORM);
    setEditingId(null);
    setError('');
    setSuccess('');
  };

  const startEdit = (contact: Contact) => {
    setEditingId(contact.id);
    setForm({
      numero: contact.numero,
      nombre: contact.nombre,
      apellido: contact.apellido,
      telefono: contact.telefono,
      apodo: contact.apodo,
      nota: contact.nota,
    });
    setSelectedContact(null);
    setError('');
    setSuccess('');
  };

  const openContact = (contact: Contact) => setSelectedContact(contact);

  const closeContact = () => setSelectedContact(null);

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if ([form.nombre, form.apellido, form.telefono].some((value) => !value.trim())) {
      setError('Nombre, apellido y numero de tlf son obligatorios');
      return;
    }

    if(form.nombre.length < 2 || form.nombre.length > 20) {
      setError('El nombre debe tener al menos 2 caracteres y no puede exceder los 20 caracteres');
      return;
    }

    if(form.apellido.length < 2 || form.apellido.length > 20) {
      setError('El apellido debe tener al menos 2 caracteres y no puede exceder los 20 caracteres');
      return;
    }

    if(form.telefono.length < 7 || form.telefono.length > 15) {
      setError('El numero de telefono debe tener al menos 7 caracteres y no puede exceder los 15 caracteres');
      return;
    }

    if(form.apodo.length > 15) {
      setError('El apodo no puede exceder los 15 caracteres');
      return;
    }

    if(form.nota.length > 100) {
      setError('La nota no puede exceder los 100 caracteres');
      return;
    }

    const numero = editingId !== null ? form.numero.trim() : buildNextContactNumber(contacts);

    const payload = {
      ownerUsername,
      numero,
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      telefono: form.telefono.trim(),
      apodo: form.apodo.trim(),
      nota: form.nota.trim(),
      creadoEn: new Date().toISOString(),
    };

    if (editingId !== null) {
      await updateContact({ ...payload, id: editingId });
      setSuccess('Contacto actualizado correctamente');
    } else {
      await addContact(payload);
      setSuccess('Contacto creado correctamente');
    }

    await loadContacts();
    resetForm();
  };

  const handleDelete = async (contact: Contact) => {
    const confirmed = window.confirm(`¿Borrar a ${contact.nombre} ${contact.apellido}?`);
    if (!confirmed) {
      return;
    }

    await deleteContact(contact.id);
    await loadContacts();

    if (selectedContact?.id === contact.id) {
      setSelectedContact(null);
    }
  };

  return {
    contacts: filteredContacts,
    form,
    selectedContact,
    editingId,
    search,
    error,
    success,
    setSearch,
    handleChange,
    handleSubmit,
    handleDelete,
    openContact,
    closeContact,
    startEdit,
    resetForm,
  };
};