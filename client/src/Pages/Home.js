import { useEffect, useRef, useState } from 'react';

import fotoIvan from '../Images/logo.jpg';
import imgMonedita from '../Images/moneda_icono.png';
import '../Styles/HomeStyle.css';

import Timeline from '../Components/Timeline';
import AcordeonCondiciones from '../Components/AcordeonCondiciones';
import Calendly from '../Components/Calendly';
import OpinionesGoogle from '../Components/OpinionesGoogle';
import CintaEmpresas from '../Components/CintaEmpresas';

function Home() {
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
            setVisible(true);
            }
        },
        { threshold: 0.4 } // Se activa cuando el 40% de la sección es visible
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const useCounter = (endValue, speed = 20) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
        if (!visible) return;
        let start = 0;
        const increment = endValue / 80; 

        const timer = setInterval(() => {
            start += increment;
            if (start >= endValue) {
            clearInterval(timer);
            setCount(endValue);
            } else {
            setCount(Math.ceil(start));
            }
        }, speed);

        return () => clearInterval(timer);
        }, [visible, endValue, speed]);

        return count;
    };

    const facturas = useCounter(18000);
    const clientes = useCounter(60);
    const enfocados = useCounter(100);
    
    return(
        <>
         <section className="Inicio" id="Inicio">
            <h2 className='titulo-inicio'>Optimiza tu negocio con servicios Contables e Impositivos.</h2>
            <p className='texto-inicio'>Deja la complejidad fiscal en manos expertas y enfócate en lo que realmente importa: <b>¡hacer crecer tu negocio!</b></p>
            <button className='btn-contactanos'>¡CONTACTANOS AHORA!</button>
         </section>

         <section className="Sobre-Nosotros" id="SobreNosotros">
            <div className="imagen-Ivan">
                <img src={fotoIvan} alt="Foto Cdor. Iván Bellomo" id="img-ivan"/>
                <img src={imgMonedita} alt="icono moneda" className="monedita" id="moneda-derecha"/>
                <img src={imgMonedita} alt="icono moneda" className="monedita" id="moneda-izquierda"/>
                <span className='cartel-cdor'>Cdor. Iván Bellomo</span>
            </div>
            <div className='texto-sobre-nosotros'>
                <h3>Sobre Nosotros</h3>
                <p>Somos un estudio contable liderado por Iván Bellomo, Contador Público matriculado en el Consejo Profesional de CABA. Con amplia experiencia en materia tributaria y contable, ofrecemos asesoramiento integral a emprendimientos y empresas, tanto en Argentina como en el exterior.</p>
                <p>Trabajamos de manera personalizada y cercana, diseñando soluciones a medida que optimizan tus recursos y potencian tu crecimiento. Nuestro compromiso es brindarte confianza, eficiencia y acompañamiento profesional en cada etapa de tu desarrollo.</p>
                <p>¡Estamos para ayudarte!</p>
            </div>
         </section>
         <section className='secc-impacto' ref={ref}>
            <h3>Contabilidad clara, sin estrés.</h3>
            <p>Nos ocupamos de tus obligaciones fiscales para que puedas enfocarte en hacer crecer tu negocio. Evitá errores y cumplí con ARCA sin complicaciones.</p>
            <div className='contenedor-caracteristicas'>
                <div className="caracteristica-impacto">
                    <span className="material-symbols-outlined">group</span>
                    <p className="numero">{visible ? `+${clientes}` : '+0'} Clientes</p>
                    <p className='texto-impacto'>que confían mes a mes</p>
                </div>
                <span className='divisor-caracteristicas'></span>
                <div className="caracteristica-impacto">
                    <span className="material-symbols-outlined icono-impacto">corporate_fare</span>
                    <p className="numero">{visible ? `${enfocados}%` : '0%'} Enfocados</p>
                    <p className='texto-impacto'>en PYMES y Emprendedores de Argentina</p>
                </div>
                <span className='divisor-caracteristicas'></span>
                <div className="caracteristica-impacto">
                    <span className="material-symbols-outlined icono-impacto">receipt_long</span>
                    <p className="numero">{visible ? `+${facturas.toLocaleString()}` : '+0'}</p>
                    <p className='texto-impacto'>facturas emitidas</p>
                </div>
            </div>
         </section>
         <section className='servicios' id="Servicios">

         </section>
         <section className='asesoria'>
            <div>
                <h2 id='title-asesoria'>Asesoría Fiscal Express</h2>
                <h3 id='subtitle-asesoria'>Decisión rápida y segura, online.</h3>
                <p  id='text-asesoria'>Ideal para resolver dudas concretas y tomar decisiones rápidas desde cualquier lugar.</p>
            </div>
            <Timeline />
            <div className='contenedor-caracteristicas-reunion'>
               <div className='caracteristicas-reunion'>
                    <div className="caracteristica-reu">
                        <p className="title-reu">Duración</p>
                        <p className='texto-reu'>30 Minutos</p>
                    </div>
                    <span className='divisor-caracteristicas'></span>
                    <div className="caracteristica-reu">
                        <p className="title-reu">100% online</p>
                        <p className='texto-reu'>Zoom/Google Meet</p>
                    </div>
                    <span className='divisor-caracteristicas'></span>
                    <div className="caracteristica-reu">
                        <p className="title-reu">$50.000 ARS</p>
                        <p className='texto-reu'>Precio final</p>
                    </div>
                </div> 
                <p><b>Pago Anticipado para confirmar la reserva.</b></p>
                <p>* Transferencia bancaria al Alias ivan.bellomo </p>
                <p>Se emite Factura C</p>
            </div>
            
            <AcordeonCondiciones />
            {/*
            <Calendly/>
            */}
         </section>
         {/*
         <OpinionesGoogle />
         */}
         <CintaEmpresas />
        </>
    );
}

export default Home;