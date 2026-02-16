import { useEffect, useState, useRef  } from 'react';
import { HashLink } from 'react-router-hash-link';
import { useLocation } from 'react-router-dom';

import '../Styles/BtnContactanos.css';

function BtnContactoFlotante() {
    const [showFloatBtn, setShowFloatBtn] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const location = useLocation();
    const touchTimer = useRef(null);
    const isTouchDevice = useRef(false);
    
    useEffect(() => {
        // Detectar si es dispositivo táctil
        isTouchDevice.current = 'ontouchstart' in window;
        
        if (location.pathname === '/') {
            // Pequeño delay para asegurar que el DOM está listo
            setTimeout(() => {
                const btnOriginal = document.querySelector('.btn-contactanos');
                
                if (btnOriginal) {
                    const observer = new IntersectionObserver(
                        ([entry]) => {
                            setShowFloatBtn(!entry.isIntersecting);
                        },
                        { threshold: 0, rootMargin: "0px" }
                    );
                    
                    observer.observe(btnOriginal);
                    
                    return () => {
                        observer.disconnect();
                    };
                } else {
                    // Si no hay botón original, mostramos el flotante igual
                    setShowFloatBtn(true);
                }
            }, 500);
        } else {
            setShowFloatBtn(true);
        }
        
    }, [location.pathname]);

    // Manejar touch en móviles
    const handleTouchStart = (e) => {
        // Limpiar timer anterior si existe
        if (touchTimer.current) {
            clearTimeout(touchTimer.current);
        }
        
        // Activar expansión
        setIsActive(true);
    };

    const handleTouchEnd = (e) => {
        // Prevenir comportamiento por defecto de manera no pasiva
        e.preventDefault();
        
        // Guardar referencia al enlace para navegar después
        const link = e.currentTarget;
        
        // Configurar timer para navegar después de la expansión
        touchTimer.current = setTimeout(() => {
            // Navegar programáticamente
            window.location.href = '/contacto#FormularioDeContacto';
        }, 300);
    };

    const handleTouchMove = () => {
        // Si el usuario se mueve (scroll), cancelar la expansión y navegación
        if (touchTimer.current) {
            clearTimeout(touchTimer.current);
            touchTimer.current = null;
        }
        setIsActive(false);
    };

    const handleTouchCancel = () => {
        // Si se cancela el touch, limpiar todo
        if (touchTimer.current) {
            clearTimeout(touchTimer.current);
            touchTimer.current = null;
        }
        setIsActive(false);
    };

    const handleClick = (e) => {
        // En desktop, comportamiento normal
        if (!isTouchDevice.current) {
            return; // Dejar que el HashLink maneje la navegación
        }
        
        // En móviles, si ya está activo, navegamos
        if (isActive) {
            return; // Dejar que el HashLink maneje la navegación
        }
        
        // Si no está activo, prevenimos y activamos
        e.preventDefault();
        setIsActive(true);
        
        // Timer para navegar
        setTimeout(() => {
            window.location.href = '/contacto#FormularioDeContacto';
        }, 300);
    };

    if (!showFloatBtn) return null;


     return (
        <HashLink 
            smooth 
            to="/contacto#FormularioDeContacto" 
            className="btn-contactanos-flotante"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
            onTouchCancel={handleTouchCancel}
            onClick={handleClick}
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
        >
            <div className={`contenedor-boton ${isActive ? 'active' : ''}`}>
                <span className="icono-contenedor">
                    <span className="material-symbols-outlined">
                        mail

                    </span>
                </span>
                <span className="texto-boton">
                    CONTACTANOS    
                </span>
            </div>
        </HashLink>
    );
}

export default BtnContactoFlotante;