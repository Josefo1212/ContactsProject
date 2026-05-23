import { Link, useLocation } from 'react-router-dom';
import '../styles/welcome.css';

type LocationState = {
  username?: string;
};

const Welcome = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const username = state?.username ?? 'usuario';

  return (
    <div className="welcome-page">
      <main className="welcome-shell">
        <section className="welcome-hero">
          <p className="welcome-kicker">Acceso verificado</p>
          <h1 className="welcome-title">Bienvenido, {username}</h1>
          <p className="welcome-text">
            Esta será la base de la pantalla principal después del login. Más adelante vamos a sumar aquí el gestor de
            contactos, el detalle en popup y las distintas vistas adaptables.
          </p>

          <div className="welcome-actions">
            <Link className="welcome-button primary" to="/login">
              Volver al login
            </Link>
            <a className="welcome-button secondary" href="#next-steps">
              Ver base del panel
            </a>
          </div>
        </section>

        <section className="welcome-grid" id="next-steps">
          <article className="welcome-card highlight">
            <p className="welcome-card-label">Próximo módulo</p>
            <h2>Agenda de contactos</h2>
            <p>
              Aquí agregaremos el CRUD completo con crear, editar, borrar, búsqueda y una vista detallada para cada
              contacto.
            </p>
          </article>

          <article className="welcome-card">
            <p className="welcome-card-label">Estado</p>
            <h2>Sesión activa</h2>
            <p>El acceso fue validado correctamente y el usuario puede continuar hacia el panel principal.</p>
          </article>

          <article className="welcome-card">
            <p className="welcome-card-label">Estructura</p>
            <h2>Base preparada</h2>
            <p>
              Esta pantalla ya deja espacio para sidebar, métricas rápidas, accesos directos y cualquier módulo nuevo.
            </p>
          </article>

          <article className="welcome-card accent">
            <p className="welcome-card-label">Siguiente paso</p>
            <h2>Elegir el diseño del panel</h2>
            <p>
              Cuando quieras, pasamos a construir la interfaz de contactos encima de esta base, paso por paso.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
};

export default Welcome;
