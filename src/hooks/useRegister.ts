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

const isLengthInvalid = (value: string, min: number, max: number) =>
  value.length < min || value.length > max;
const PHONE_ALLOWED_PATTERN = /^[0-9+-]+$/;
const sanitizePhone = (value: string) => value.replace(/[^0-9+-]/g, '');

export const useRegister = () => {
  const [form, setForm] = useState<RegisterForm>(initialForm);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const nextValue = name === 'phone' ? sanitizePhone(value) : value;
    setForm((prev) => ({ ...prev, [name]: nextValue }));
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (Object.values(form).some((value) => !value.trim())) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (isLengthInvalid(form.username, 2, 20)) {
      setError('El usuario debe tener entre 2 y 20 caracteres');
      return;
    }

    if (isLengthInvalid(form.password, 8, 15)) {
      setError('La contraseña debe tener entre 8 y 15 caracteres');
      return;
    }

    const phoneValue = form.phone.trim();
    if (!PHONE_ALLOWED_PATTERN.test(phoneValue)) {
      setError('El telefono solo puede contener numeros, + y -');
      return;
    }

    if (isLengthInvalid(phoneValue, 8, 15)) {
      setError('El telefono debe tener entre 8 y 15 caracteres');
      return;
    }

    if (isLengthInvalid(form.name, 2, 20)) {
      setError('El nombre debe tener entre 2 y 20 caracteres');
      return;
    }

    if (isLengthInvalid(form.lastName, 2, 20)) {
      setError('El apellido debe tener entre 2 y 20 caracteres');
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
      phone: phoneValue,
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
