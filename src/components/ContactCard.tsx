import type { Contact } from '../models/Contact';
import { ContactCardActions } from './ContactCardActions';
import { ContactName } from './ContactName';

type Props = {
  contact: Contact;
  onView: (contact: Contact) => void;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
};

export const ContactCard = ({ contact, onView, onEdit, onDelete }: Props) => {
  return (
    <article className="contact-card">
      <button type="button" className="contact-card-main" onClick={() => onView(contact)}>
        <div className="contact-avatar" aria-hidden="true">
          {contact.avatar ? <img src={contact.avatar} alt="" /> : null}
        </div>

        <div className="contact-card-copy">
          <div className="contact-card-topline">
            <span className="contact-chip">{contact.numero}</span>
            <span className="contact-muted">{contact.apodo || 'Sin apodo'}</span>
          </div>
          <h3>
            <ContactName nombre={contact.nombre} apellido={contact.apellido} />
          </h3>
          <p>{contact.telefono}</p>
        </div>
      </button>

      <ContactCardActions
        onView={() => onView(contact)}
        onEdit={() => onEdit(contact)}
        onDelete={() => onDelete(contact)}
      />
    </article>
  );
};