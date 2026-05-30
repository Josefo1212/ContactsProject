import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/contacts.css';
import { useContacts } from '../hooks/useContacts';
import { ContactCard } from '../components/ContactCard';
import { ContactForm } from '../components/ContactForm';
import { ContactModal } from '../components/ContactModal';

type LocationState = {
  username?: string;
};

const Welcome = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const username = (state?.username ?? 'jose').toLowerCase();

  const [viewVersion, setViewVersion] = useState(1);
  const viewOptions = [
    { id: 1, label: 'Lista extendida' },
    { id: 2, label: 'Mosaico' },
    { id: 3, label: 'Split 2 columnas' },
    { id: 4, label: 'Carnet ID' },
  ];

  const {
    contacts,
    form,
    selectedContact,
    editingId,
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
  } = useContacts(username);

  return (
    <div className="contacts-page">
      <header className="contacts-hero">
        <div>
          <p className="section-kicker">ACCESO VERIFICADO</p>
          <h1 className="contacts-title">Bienvenido, {username}</h1>
          <p className="contacts-subtitle">
            CRUD simple de contactos con formulario, edición, borrado y vista completa en popup.
          </p>
        </div>
        <Link className="contact-button ghost" to="/login">
          Volver al login
        </Link>
      </header>

      <main className="contacts-layout">
        <section className="contacts-panel contacts-panel--form">
          <ContactForm
            form={form}
            isEditing={editingId !== null}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onReset={resetForm}
          />
          {error ? <p className="contact-message error">{error}</p> : null}
          {success ? <p className="contact-message success">{success}</p> : null}
        </section>

        <section className="contacts-panel contacts-panel--list">
          <div className="section-head">
            <div>
              <p className="section-kicker">Contactos</p>
              <h2>{contacts.length} contacto(s)</h2>
            </div>
            <div className="contacts-toolbar">
              <input
                className="contacts-search-input"
                type="search"
                placeholder="Buscar contacto"
                onChange={(event) => setSearch(event.target.value)}
              />
              <div className="contacts-view-group" role="group" aria-label="Selector de vista">
                {viewOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`contact-button ghost contacts-view-option${
                      viewVersion === option.id ? ' is-active' : ''
                    }`}
                    onClick={() => setViewVersion(option.id)}
                    aria-pressed={viewVersion === option.id}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={`contacts-grid vista-${viewVersion}`}>
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                  onView={openContact}
                  onEdit={startEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <div className="contact-empty-state">
                <h3>No hay contactos todavía</h3>
                <p>Agrega el primero desde el formulario.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <ContactModal contact={selectedContact} onClose={closeContact} />
    </div>
  );
};

export default Welcome;
