import { Link } from 'react-router-dom';
import '../styles/login.css';
import '../styles/register.css';
import { useRegister } from '../hooks/useRegister';

const Register = () => {
	const { form, error, success, handleChange, handleSubmit } = useRegister();

	return (
		<div className="login-page">
			<form className="login-card register-card" onSubmit={handleSubmit}>
				<h1 className="login-title">Registro</h1>
				<p className="login-subtitle">Completa tus datos</p>

				<label className="login-label" htmlFor="username">
					Usuario
				</label>
				<input
					id="username"
					name="username"
					className="login-input"
					type="text"
					placeholder="Nombre de usuario"
					value={form.username}
					onChange={handleChange}
					autoComplete="username"
					required
				/>

				<label className="login-label" htmlFor="password">
					Contrasena
				</label>
				<input
					id="password"
					name="password"
					className="login-input"
					type="password"
					placeholder="Crea una contrasena"
					value={form.password}
					onChange={handleChange}
					autoComplete="new-password"
					required
				/>

				<label className="login-label" htmlFor="phone">
					Telefono
				</label>
				<input
					id="phone"
					name="phone"
					className="login-input"
					type="tel"
					placeholder="Numero de telefono"
					value={form.phone}
					onChange={handleChange}
					autoComplete="tel"
					required
				/>

				<label className="login-label" htmlFor="name">
					Nombre
				</label>
				<input
					id="name"
					name="name"
					className="login-input"
					type="text"
					placeholder="Tu nombre"
					value={form.name}
					onChange={handleChange}
					autoComplete="given-name"
					required
				/>

				<label className="login-label" htmlFor="lastName">
					Apellido
				</label>
				<input
					id="lastName"
					name="lastName"
					className="login-input"
					type="text"
					placeholder="Tu apellido"
					value={form.lastName}
					onChange={handleChange}
					autoComplete="family-name"
					required
				/>

				<button className="login-button" type="submit">
					Registrarse
				</button>

				<p className="login-footer">
					Ya tienes cuenta?{' '}
					<Link className="login-link" to="/login">
						Volver al login
					</Link>
				</p>

				{error ? <p className="login-error">{error}</p> : null}
				{success ? <p className="login-success">{success}</p> : null}
			</form>
		</div>
	);
};

export default Register;
