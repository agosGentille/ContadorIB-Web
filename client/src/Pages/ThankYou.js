import { HashLink } from 'react-router-hash-link';
import '../Styles/ThankYouPageStyle.css';

function ThankYou() {
    return (
        <div className="thankyou-page">
            <div className="thankyou-container">
                <div className="icono-check-container">
                    <div className="icono-check">✓</div>
                </div>
                
                <h1 className="thankyou-titulo">¡Muchas gracias!</h1>
                <div className="thankyou-subrayado"></div>
                
                <p className="mensaje-principal">
                    Hemos recibido tu mensaje correctamente.
                </p>
                
                <p className="mensaje-secundario">
                    Uno de nuestros asesores se comunicará con vos a la brevedad para brindarte toda la información que necesitas.
                </p>
                
                <div className="thankyou-acciones">
                    <HashLink smooth to="/" className="btn-volver">
                        <span className="material-symbols-outlined">home</span>
                        Volver al inicio
                    </HashLink>
                    <HashLink smooth to="/#Servicios" className="btn-servicios">
                        <span className="material-symbols-outlined">star</span>
                        Ver servicios
                    </HashLink>
                </div>
            </div>
        </div>
    );
}

export default ThankYou;