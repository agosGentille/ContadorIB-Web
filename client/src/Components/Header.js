import React, { useState, useEffect } from 'react';
import { HashLink  } from 'react-router-hash-link';
import '../Styles/HeaderStyle.css';

import logo from '../Images/logo.jpg';

function Header() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [menuOpen, setMenuOpen] = useState(false);

    // Detectar cambios de tamaño de pantalla, más que nada para modo de desarrollo
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

    return(
        <header className='header-sticky'>
            <div className='header-menu'>
                <span onClick={toggleMenu} className={`material-symbols-outlined menu-icon ${menuOpen ? 'open' : ''}`}>menu</span>
            </div>
            <div className='header-marca'>
                <HashLink smooth to="/#Inicio"><img src={logo} alt='Logo Estudio Contable IB' id='Logo'/></HashLink>
            </div> 
            <nav className={`header-nav ${menuOpen ? "open" : ""}`}>
                <span onClick={toggleMenu} className={`material-symbols-outlined btnClose ${menuOpen ? 'open' : ''}`}>close_small</span>
                <div className='header-nav-inner'>
                    <ul>
                    <li><HashLink onClick={toggleMenu} smooth to="/#Servicios">Servicios</HashLink></li>
                    <li><HashLink onClick={toggleMenu} smooth to="/planes#Planes">Planes</HashLink></li>
                    <li><HashLink onClick={toggleMenu} smooth to="/planes#Sociedades">Constitución SAS/SRL</HashLink></li>
                    <li><HashLink onClick={toggleMenu} smooth to="/#SobreNosotros">Sobre Nosotros</HashLink></li>
                    <li><HashLink onClick={toggleMenu} smooth to="/contacto#FormularioDeContacto">Contacto</HashLink></li>
                </ul>
                </div>
            </nav>
             <div 
                className={`nav-overlay ${menuOpen ? "active" : ""}`} 
                onClick={toggleMenu}
            ></div> 
            <div className="header-actions">
                <a 
                    href="https://wa.me/541131214776?text=Hola,%20Contador%20Iv%C3%A1n%20Bellomo.%20Me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20servicios%20contables%20que%20ofrecen." 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-Hablanos"
                >
                    <span translate="no" className="material-symbols-outlined">call</span>
                </a>

                <div className="switch-dark-light" onClick={toggleTheme}>
                    {theme === 'light' ? (
                    <span className="material-symbols-outlined" style={{ color: '#333' }}>light_mode</span>
                    ) : (
                    <span className="material-symbols-outlined" style={{ color: 'white' }}>dark_mode</span>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;