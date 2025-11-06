import { HashLink } from 'react-router-hash-link';
import '../Styles/FooterStyle.css';

import instagram_logo from '../Images/instagram.png';
import whatsapp_logo from '../Images/whatsapp.png';
import linkedin_logo from '../Images/linkedin.png';
import google_logo from '../Images/google.png';
import logo from '../Images/logo.jpg';

function Footer() {

    return(
        <footer>
            <div className="footer-header">
                <p className="contador">Contador Iván Bellomo</p>
                <div className='Logo-Alineado-Izquierda'>
                    <img src={logo} alt='Logo Estudio Contable IB' id='logo-footer'/>
                </div>
            </div>
            <div className='footer-info'>
                <div id="footer-columna1">
                    <HashLink smooth to="/contacto#FormularioDeContacto" className='contacto'>Contacto</HashLink>
                    <div className="contactos">
                        <a href="https://www.instagram.com/contador.ib/"
                        target="_blank" rel="noopener noreferrer">
                            <img src={instagram_logo} alt="logo instagram" id="icono-ig-contacto"/>
                        </a>
                        <a href="https://wa.me/541131214776?text=Hola,%20Contador%20Iv%C3%A1n%20Bellomo.%20Me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20servicios%20contables%20que%20ofrecen." 
                        target="_blank" rel="noopener noreferrer">
                            <img src={whatsapp_logo} alt="logo whatsapp" id="icono-wsp-contacto"/>
                        </a>
                        <a href="https://maps.google.com/?q=Contador+IB,+Av.+del+Golf+2100,+Tigre,+Buenos+Aires" 
                            target="_blank" rel="noopener noreferrer">
                            <img src={google_logo} alt="logo Google" id="icono-google-contacto"/>
                        </a>
                        <a href="https://www.linkedin.com/in/ivan-bellomo-contadorpublico/" 
                        target="_blank" rel="noopener noreferrer">
                            <img src={linkedin_logo} alt="logo LinkedIn" id="icono-linkedin-contacto"/>
                        </a>  
                    </div>
                    <p>+54 9 11 3121-4776</p>
                    <p>ivan.bellomo@contadorib.com.ar</p>
                </div>
                <div id="footer-columna2">
                    <p className='texto-links-utiles'>Links Útiles</p>
                    <div className='links-utiles'>
                        <ul>
                            <li><HashLink smooth to="/planes#Sociedades">Constitución de Sociedades</HashLink></li>
                            <li><HashLink smooth to="/planes#Planes">Planes</HashLink></li>
                            <li><HashLink smooth to="/contacto#Mapa">Nuestro Estudio</HashLink></li>
                        </ul>
                    </div>
                </div>
            </div>
            <p className='centrado'>&copy; 2025, Estudio Contable IB. Todos los derechos reservados.</p>
        </footer>
    );
}

export default Footer;