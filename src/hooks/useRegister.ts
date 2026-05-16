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

    // Validaciones de campos vacíos
    if (Object.values(form).some((value) => !value.trim())) {
      setError('Todos los campos son obligatorios');
      return;
    }

    // Validación de username
    if (form.username.length < 3 || form.username.length > 20) {
      setError('El usuario debe tener entre 3 y 20 caracteres');
      return;
    }

    // Validación de password
    if (form.password.length < 8 || form.password.length > 15) {
      setError('La contraseña debe tener entre 8 y 15 caracteres');
      return;
    }

    // Validación de teléfono (solo números y 8-15 dígitos)
    if (!/^\d{8,15}$/.test(form.phone)) {
      setError('El teléfono debe tener solo números y entre 8 y 15 dígitos');
      return;
    }

    // Validación de nombre
    if (form.name.length < 2 || form.name.length > 30) {
      setError('El nombre debe tener entre 2 y 30 caracteres');
      return;
    }

    // Validación de apellido
    if (form.lastName.length < 2 || form.lastName.length > 30) {
      setError('El apellido debe tener entre 2 y 30 caracteres');
      return;
    }

    // Validación de usuario existente
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
