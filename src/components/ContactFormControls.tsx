import type { ChangeEvent } from 'react';
import type { ContactFormValues } from '../models/Contact';
import { ContactFormButtons } from './ContactFormButtons';

type Props = {
  form: ContactFormValues;
  isEditing: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onReset: () => void;
};

const renderField = (
  label: string,
  name: keyof ContactFormValues,
  value: string,
  onChange: Props['onChange'],
  placeholder: string,
  type: 'text' | 'tel' = 'text',
) => (
  <label className="contact-field" htmlFor={String(name)}>
    <span>{label}</span>
    <input
      id={String(name)}
      name={String(name)}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
    />
  </label>
);

export const ContactFormControls = ({ form, isEditing, onChange, onReset }: Props) => {
  return (
    <>
      <div className="contact-form-header">
        <div>
          <p className="section-kicker">{isEditing ? 'EDITAR CONTACTO' : 'NUEVO CONTACTO'}</p>
          <h2>Crear contacto</h2>
        </div>
      </div>

      <div className="contact-form-grid">
        {renderField('Nombre', 'nombre', form.nombre, onChange, 'Ej: Laura')}
        {renderField('Apellido', 'apellido', form.apellido, onChange, 'Ej: Perez')}
        {renderField('Numero de tlf', 'telefono', form.telefono, onChange, 'Ej: +54 11 5555 1234', 'tel')}
      </div>

      <label className="contact-field contact-field--wide" htmlFor="apodo">
        <span>Apodo</span>
        <input id="apodo" name="apodo" value={form.apodo} onChange={onChange} placeholder="Ej: Lala" />
      </label>

      <label className="contact-field contact-field--wide" htmlFor="nota">
        <span>Nota</span>
        <textarea id="nota" name="nota" value={form.nota} onChange={onChange} placeholder="Notas del contacto" rows={5} />
      </label>

      <ContactFormButtons isEditing={isEditing} onReset={onReset} />
    </>
  );
};