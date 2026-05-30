import type { Contact } from '../models/Contact';
import { ContactName } from './ContactName';

type Props = {
  contact: Contact | null;
  onClose: () => void;
};

export const ContactModal = ({ contact, onClose }: Props) => {
  if (!contact) {
    return null;
  }

  return (
    <div className="contact-modal-backdrop" onClick={onClose}>
      <section className="contact-modal" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="contact-modal-close" onClick={onClose}>
          ×
        </button>
        <header className="contact-modal-header">
          <p className="section-kicker">Detalle completo</p>
          <h2>
            <ContactName nombre={contact.nombre} apellido={contact.apellido} />
          </h2>
          <p className="contact-modal-subtitle">{contact.apodo || 'Sin apodo'}</p>
        </header>

        <div className="contact-modal-body">
          <dl className="contact-detail-grid">
            <div>
              <dt>Numero</dt>
              <dd>{contact.numero}</dd>
            </div>
            <div>
              <dt>Numero de tlf</dt>
              <dd>{contact.telefono}</dd>
            </div>
            <div>
              <dt>Apodo</dt>
              <dd>{contact.apodo || 'Sin apodo'}</dd>
            </div>
            <div>
              <dt>Nota</dt>
              <dd>{contact.nota || 'Sin nota'}</dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
};