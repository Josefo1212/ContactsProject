import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
	const navigate = useNavigate();
	const {
		username,
		setUsername,
		password,
		setPassword,
		error,
		success,
		handleSubmit,
	} = useLogin((usernameValue) =>
		navigate('/welcome', { state: { username: usernameValue } }),
	);

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

				<p className="login-footer">
					No tienes cuenta?{' '}
					<Link className="login-link" to="/register">
						Crear cuenta
					</Link>
				</p>

				{error ? <p className="login-error">{error}</p> : null}
				{success ? <p className="login-success">{success}</p> : null}
			</form>
		</div>
	);
};

export default Login;
