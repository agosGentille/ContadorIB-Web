import { useEffect, useState, useRef } from 'react';
import { HashLink } from 'react-router-hash-link';
import { useLocation } from 'react-router-dom';

import '../Styles/BtnContactanos.css';
import whatsapp_logo from '../Images/whatsapp-hablemos.png';

function BtnContactoFlotante() {
const [showFloatBtn, setShowFloatBtn] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const location = useLocation();
    const touchTimer = useRef(null);
    const isTouchDevice = useRef(false);
    const expandedByTouch = useRef(false);
    const hoverTimeout = useRef(null);
    
    useEffect(() => {
        // Detectar si es dispositivo táctil
        isTouchDevice.current = 'ontouchstart' in window;
        
        // SIEMPRE mostrar el botón flotante, sin importar dónde estés
        setShowFloatBtn(true);
        
        // Código original comentado para que no oculte el botón
        /*
        if (location.pathname === '/') {
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
                    setShowFloatBtn(true);
                }
            }, 500);
        } else {
            setShowFloatBtn(true);
        }
        */
        
    }, [location.pathname]);

    // Resetear expandedByTouch cuando se oculta el botón
    useEffect(() => {
        if (!showFloatBtn) {
            expandedByTouch.current = false;
            setIsActive(false);
        }
    }, [showFloatBtn]);

    // Manejar touch en móviles
    const handleTouchStart = () => {
        if (touchTimer.current) {
            clearTimeout(touchTimer.current);
            touchTimer.current = null;
        }
    };

    const handleTouchEnd = (e) => {
        e.preventDefault();
        
        if (!expandedByTouch.current) {
            // PRIMER TAP: solo expandir
            expandedByTouch.current = true;
            setIsActive(true);
            
            // Auto-contraer después de 3 segundos
            touchTimer.current = setTimeout(() => {
                expandedByTouch.current = false;
                setIsActive(false);
                touchTimer.current = null;
            }, 3000);
            
            return;
        }
        
        // SEGUNDO TAP: navegar
        expandedByTouch.current = false;
        setIsActive(false);
        
        if (touchTimer.current) {
            clearTimeout(touchTimer.current);
            touchTimer.current = null;
        }
        
        window.location.href = '/contacto#FormularioDeContacto';
    };

    const handleTouchMove = () => {
        if (touchTimer.current) {
            clearTimeout(touchTimer.current);
            touchTimer.current = null;
        }
        expandedByTouch.current = false;
        setIsActive(false);
    };

    const handleTouchCancel = () => {
        if (touchTimer.current) {
            clearTimeout(touchTimer.current);
            touchTimer.current = null;
        }
        expandedByTouch.current = false;
        setIsActive(false);
    };

    const handleClick = (e) => {
        // En desktop, comportamiento normal
        if (!isTouchDevice.current) {
            return; // Dejar que el HashLink maneje la navegación
        }
        
        // En móviles, prevenimos
        e.preventDefault();
    };

    // Manejadores para desktop
    const handleMouseEnter = () => {
        if (!isTouchDevice.current) {
            if (hoverTimeout.current) {
                clearTimeout(hoverTimeout.current);
                hoverTimeout.current = null;
            }
            setIsActive(true);
        }
    };

    const handleMouseLeave = () => {
        if (!isTouchDevice.current) {
            hoverTimeout.current = setTimeout(() => {
                setIsActive(false);
                hoverTimeout.current = null;
            }, 100);
        }
    };

    if (!showFloatBtn) return null;

    return (
        <>

            <a 
                href="https://wa.me/541131214776?text=Hola,%20Contador%20Iv%C3%A1n%20Bellomo.%20Me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20servicios%20contables%20que%20ofrecen." 
                target="_blank" rel="noopener noreferrer"
                className={`btn-contactanos-flotante ${isTouchDevice.current ? 'touch-device' : ''}`}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchMove}
                onTouchCancel={handleTouchCancel}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className={`contenedor-boton ${isActive ? 'active' : ''}`}>
                    <img src={whatsapp_logo} alt="logo whatsapp" id="icono-wsp" className="icono-contenedor"/>
                    <span className="texto-boton">CONTACTANOS</span>
                </div>
            </a>

            
        </>
    );
}

export default BtnContactoFlotante;