import type { ContactFormValues } from '../models/Contact';
import { ContactFormControls } from './ContactFormControls';

type Props = {
  form: ContactFormValues;
  isEditing: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onAvatarChange: (avatar: string) => void;
  onSubmit: (event: React.SyntheticEvent<HTMLFormElement>) => void;
  onReset: () => void;
};

export const ContactForm = ({
  form,
  isEditing,
  onChange,
  onAvatarChange,
  onSubmit,
  onReset,
}: Props) => {
  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <ContactFormControls
        form={form}
        isEditing={isEditing}
        onChange={onChange}
        onAvatarChange={onAvatarChange}
        onReset={onReset}
      />
    </form>
  );
};