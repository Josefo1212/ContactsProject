type Props = {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export const ContactCardActions = ({ onView, onEdit, onDelete }: Props) => {
  return (
    <div className="contact-card-actions">
      <button type="button" className="contact-button ghost" onClick={onView}>
        Ver
      </button>
      <button type="button" className="contact-button ghost" onClick={onEdit}>
        Editar
      </button>
      <button type="button" className="contact-button danger" onClick={onDelete}>
        Borrar
      </button>
    </div>
  );
};