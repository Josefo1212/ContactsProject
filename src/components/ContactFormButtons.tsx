type Props = {
  isEditing: boolean;
  onReset: () => void;
};

export const ContactFormButtons = ({ isEditing, onReset }: Props) => {
  return (
    <div className="contact-form-actions contact-form-actions--stacked">
      <button type="button" className="contact-button ghost contact-button--full" onClick={onReset}>
        Limpiar
      </button>
      <button type="submit" className="contact-button primary contact-button--full">
        {isEditing ? 'Guardar cambios' : 'Crear contacto'}
      </button>
    </div>
  );
};