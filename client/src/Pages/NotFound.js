import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import '../Styles/NotFoundStyle.css';

function NotFound() {
    return (
        <div className="notfound-page">
            <div className="notfound-container">
                <div className="notfound-icono-container">
                    <div className="notfound-icono">404</div>
                    <div className="notfound-icono-decoracion">
                        <span className="material-symbols-outlined">search</span>
                    </div>
                </div>
                
                <h1 className="notfound-titulo">¡Ups! Página no encontrada</h1>
                <div className="notfound-subrayado"></div>
                
                <p className="notfound-mensaje-principal">
                    La página que estás buscando no existe o fue movida.
                </p>
                
                <p className="notfound-mensaje-secundario">
                    No te preocupes, tenemos muchos servicios contables que pueden interesarte. 
                    Navegá por nuestras secciones o volvé al inicio.
                </p>
                
                <div className="notfound-sugerencias">
                    <h3>
                        <span className="material-symbols-outlined">travel_explore</span>
                        Podés visitar:
                    </h3>
                    <div className="sugerencias-links">
                        <Link to="/" className="sugerencia-link">
                            <span className="material-symbols-outlined">home</span>
                            Inicio
                        </Link>
                        <HashLink smooth to="/#Servicios" className="sugerencia-link">
                            <span className="material-symbols-outlined">design_services</span>
                            Servicios
                        </HashLink>
                        <Link to="/planes" className="sugerencia-link">
                            <span className="material-symbols-outlined">assignment</span>
                            Planes
                        </Link>
                        <Link to="/contacto" className="sugerencia-link">
                            <span className="material-symbols-outlined">contact_support</span>
                            Contacto
                        </Link>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default NotFound;