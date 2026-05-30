import '../styles/contactName.css';

type Props = {
  nombre: string;
  apellido: string;
};

export const ContactName = ({ nombre, apellido }: Props) => {
  const fullName = `${nombre} ${apellido}`.trim();

  return (
    <span className="contact-name" data-tooltip={fullName}>
      <span className="contact-name-text">{fullName}</span>
    </span>
  );
};
