import { useState } from 'react';
import type { ChangeEvent, SubmitEvent } from 'react';
import { addUser, getUserByUsername } from '../services/indexdDB';

type RegisterForm = {
  username: string;
  password: string;
  phone: string;
  name: string;
  lastName: string;
};

const initialForm: RegisterForm = {
  username: '',
  password: '',
  phone: '',
  name: '',
  lastName: '',
};

export const useRegister = () => {
  const [form, setForm] = useState<RegisterForm>(initialForm);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (Object.values(form).some((value) => !value.trim())) {
      setError('Todos los campos son obligatorios');
      return;
    }

    const existing = await getUserByUsername(form.username.trim());
    if (existing) {
      setError('El nombre de usuario ya existe');
      return;
    }

    await addUser({
      username: form.username.trim(),
      password: form.password,
      phone: form.phone.trim(),
      name: form.name.trim(),
      lastName: form.lastName.trim(),
    });

    setSuccess('Usuario registrado correctamente');
    setForm(initialForm);
  };

  return {
    form,
    error,
    success,
    handleChange,
    handleSubmit,
  };
};
