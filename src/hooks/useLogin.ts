import { useEffect, useState } from 'react';
import type { SubmitEvent } from 'react';
import { addUser, getUserByUsername } from '../services/indexdDB';

const DEFAULT_USER = {
  username: 'admin',
  password: '12345678',
  phone: '0000000000',
  name: 'Admin',
  lastName: 'Demo',
};

export const useLogin = (onSuccess?: (username: string) => void) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const ensureDefaultUser = async () => {
      const existing = await getUserByUsername(DEFAULT_USER.username);
      if (!existing) {
        await addUser(DEFAULT_USER);
      }
    };

    void ensureDefaultUser();
  }, []);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if(username.length < 3 || username.length > 20) {
      setError('El nombre de usuario debe tener entre 3 y 20 caracteres');
      return;
    }

    if(password.length < 8 || password.length > 15) {
      setError('La contrasena debe tener entre 8 y 15 caracteres');
      return;
    }

    const user = await getUserByUsername(username.trim());
    if (!user || user.password !== password) {
      setError('Usuario o contrasena incorrectos');
      return;
    }

    setSuccess(`Bienvenido, ${user.username}`);
    if (onSuccess) {
      onSuccess(user.username);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    success,
    handleSubmit,
  };
};
