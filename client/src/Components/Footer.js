import { Link } from 'react-router-dom';
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
                    <Link to="/contacto" className='contacto'>Contacto</Link>
                    <div className="contactos">
                        <a href="https://www.instagram.com/contador.ib/"
                        target="_blank" rel="noopener noreferrer">
                            <img src={instagram_logo} alt="logo instagram" id="icono-ig-contacto"/>
                        </a>
                        <a href="https://wa.me/541131214776?text=Hola,%20Contador%20Iv%C3%A1n%20Bellomo.%20Me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20servicios%20contables%20que%20ofrecen." 
                        target="_blank" rel="noopener noreferrer">
                            <img src={whatsapp_logo} alt="logo whatsapp" id="icono-wsp-contacto"/>
                        </a>
                        <a href="google.com/maps?q=Contador+IB,+Av.+Dardo+Rocha+1038,+B1648FMT+Tigre,+Provincia+de+Buenos+Aires&ftid=0x95bca5d65214d6f3:0xdcfe02340fca3636&entry=gps&lucs=,94242520,94224825,94227247,94227248,47071704,47069508,94218641,94203019,47084304,94208458,94208447&g_ep=CAISDTYuMTM2LjAuODc4MzAYACCenQoqYyw5NDI0MjUyMCw5NDIyNDgyNSw5NDIyNzI0Nyw5NDIyNzI0OCw0NzA3MTcwNCw0NzA2OTUwOCw5NDIxODY0MSw5NDIwMzAxOSw0NzA4NDMwNCw5NDIwODQ1OCw5NDIwODQ0N0ICQVI%3D&g_st=com.google.maps.preview.copy" 
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
                            <li><Link to="/contacto">Preguntas Frecuentes</Link></li>
                            <li><Link to="/planes">Planes</Link></li>
                        </ul>
                    </div>
                    {/* 
                    <a href='https://www.google.com/maps/place/Contador+IB/data=!4m2!3m1!1s0x0:0xdcfe02340fca3636?sa=X&ved=1t:2428&ictx=111' 
                    target="_blank" rel="noopener noreferrer" className='ubi'>
                        <b>Tigre</b>, Buenos Aires - Argentina
                    </a>*/}
                </div>
            </div>
            <p className='centrado'>&copy; 2025, Estudio Contable IB. Todos los derechos reservados.</p>
        </footer>
    );
}

export default Footer;