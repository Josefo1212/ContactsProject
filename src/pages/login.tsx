import { useEffect, useState } from 'react';
import { addUser, getUserByUsername } from '../services/indexdDB';
import '../styles/login.css';

const DEFAULT_USER = {
	username: 'admin',
	password: '1234',
};

const Login = () => {
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

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError('');
		setSuccess('');

		const user = await getUserByUsername(username.trim());
		if (!user || user.password !== password) {
			setError('Usuario o contrasena incorrectos');
			return;
		}

		setSuccess(`Bienvenido, ${user.username}`);
	};

	return (
		<div className="login-page">
			<form className="login-card" onSubmit={handleSubmit}>
				<h1 className="login-title">Iniciar sesion</h1>
				<p className="login-subtitle">Usa admin / 1234 para probar</p>

				<label className="login-label" htmlFor="username">
					Usuario
				</label>
				<input
					id="username"
					className="login-input"
					type="text"
					placeholder="Ingresa tu usuario"
					value={username}
					onChange={(event) => setUsername(event.target.value)}
					autoComplete="username"
					required
				/>

				<label className="login-label" htmlFor="password">
					Contrasena
				</label>
				<input
					id="password"
					className="login-input"
					type="password"
					placeholder="Ingresa tu contrasena"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					autoComplete="current-password"
					required
				/>

				<button className="login-button" type="submit">
					Entrar
				</button>

				{error ? <p className="login-error">{error}</p> : null}
				{success ? <p className="login-success">{success}</p> : null}
			</form>
		</div>
	);
};

export default Login;
