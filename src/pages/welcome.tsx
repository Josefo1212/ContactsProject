import { Link, useLocation } from 'react-router-dom';
import '../styles/login.css';

type LocationState = {
  username?: string;
};

const Welcome = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const username = state?.username ?? 'usuario';

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Bienvenido</h1>
        <p className="login-subtitle">Hola, {username}. Tu acceso fue exitoso.</p>
        <Link className="login-button" to="/login">
          Volver al login
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
