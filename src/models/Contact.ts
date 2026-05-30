export interface Contact {
  id: number;
  ownerUsername: string;
  numero: string;
  nombre: string;
  apellido: string;
  telefono: string;
  apodo: string;
  nota: string;
  avatar: string;
  creadoEn: string;
}

export type ContactFormValues = Omit<Contact, 'id' | 'ownerUsername' | 'creadoEn'>;

export const EMPTY_CONTACT_FORM: ContactFormValues = {
  numero: '',
  nombre: '',
  apellido: '',
  telefono: '',
  apodo: '',
  nota: '',
  avatar: '',
};