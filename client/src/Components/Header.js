import React, { useState, useEffect } from 'react';
import { HashLink  } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import '../Styles/HeaderStyle.css';

import logo from '../Images/logo.jpg';

function Header() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [menuOpen, setMenuOpen] = useState(false);
    const [animating, setAnimating] = useState(false);

    // Detectar cambios de tamaño de pantalla, más que nada para modo de desarrollo
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => {
        setAnimating(true); // activar animación
        setTimeout(() => setAnimating(false), 500); // duración animación
        setMenuOpen(prev => !prev);
    };

    return(
        <header className='header-sticky'>
            <div className='header-marca'>
                <img src={logo} alt='Logo Estudio Contable IB' id='Logo'/>
                <p className="estudio">Estudio Contable IB</p>
            </div>
            <nav className={`header-nav ${menuOpen ? "open" : ""}`}>
                <div className='header-nav-inner'>
                    <ul>
                    <li><HashLink smooth to="/#Servicios">Servicios</HashLink></li>
                    <li><Link to="/planes">Planes</Link></li>
                    <li><HashLink smooth to="/#SobreNosotros">Sobre Nosotros</HashLink></li>
                    <li><HashLink smooth to="/contacto#FAQ">Preguntas Frecuentes</HashLink></li>
                    <li><HashLink smooth to="/contacto#FormularioDeContacto">Contacto</HashLink></li>
                </ul>
                </div>
                {isMobile ?  
                <div className="header-nav-footer">
                    <p>Ivan Bellomo – Contador Publico (UBA)</p>
                    <p className="matricula">CPCECABA T:449 F:167</p>
                    <p className="slogan">Asesoramiento contable integral para tu negocio</p>
                </div>
                : "" }
            </nav>
            <div className='header-right'>
                {/* Ícono de menú o cerrar con */}
                {isMobile && (
                    <span
                    className={`material-symbols-outlined menu-icon ${menuOpen ? 'open' : ''} ${animating ? 'animating' : ''}`}
                    onClick={toggleMenu}
                    >
                    {menuOpen ? 'close' : 'menu'}
                    </span>
                )}

            </div>        
        </header>
    );
}

export default Header;