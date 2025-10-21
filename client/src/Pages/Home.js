import { useEffect, useRef, useState } from 'react';
import { HashLink  } from 'react-router-hash-link';

import fotoIvan from '../Images/foto_ivan.jpg';
import imgMonedita from '../Images/moneda_icono.png';
import '../Styles/HomeStyle.css';

import Timeline from '../Components/Timeline';
import AcordeonCondiciones from '../Components/AcordeonCondiciones';
import Calendly from '../Components/Calendly';
import OpinionesGoogle from '../Components/OpinionesGoogle';
import CintaEmpresas from '../Components/CintaEmpresas';

function Home() {
    const [visibleSobreNosotros, setVisibleSobreNosotros] = useState(false);
    const [visibleImpacto, setVisibleImpacto] = useState(false);
    const refSobreNosotros = useRef(null);
    const refImpacto = useRef(null);

    const [visibleServicios, setVisibleServicios] = useState(false);
    const refServicios = useRef(null);
    
    useEffect(() => {
        const observerSobreNosotros = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisibleSobreNosotros(true);
                }
            },
            { threshold: 0.4 }
        );
        const observerImpacto = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisibleImpacto(true);
                }
            },
            { threshold: 0.4 }
        );
        const observerServicios = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisibleServicios(true);
                }
            },
            { threshold: 0.3 }
        );

        if (refSobreNosotros.current) observerSobreNosotros.observe(refSobreNosotros.current);
        if (refImpacto.current) observerImpacto.observe(refImpacto.current);
        if (refServicios.current) observerServicios.observe(refServicios.current);

        return () => {
            observerSobreNosotros.disconnect();
            observerImpacto.disconnect();
        };
    }, []);

    const useCounter = (endValue, speed = 20) => {
        const [count, setCount] = useState(0);  // Si aún no se ve el elemento, no empieza a contar

        useEffect(() => {
        if (!visibleImpacto) return;
        let start = 0;
        const increment = endValue / 80; // ajusta la velocidad del conteo
        // Intervalo que actualiza el contador de forma progresiva
        const timer = setInterval(() => {
            start += increment;
            if (start >= endValue) {
            clearInterval(timer);// Si llega al valor final lo detiene 
            setCount(endValue);
            } else {
            setCount(Math.ceil(start));
            }
        }, speed);

        return () => clearInterval(timer);
        }, [visibleImpacto, endValue, speed]);

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

         <section className="Sobre-Nosotros" id="SobreNosotros" ref={refSobreNosotros}>
            <div className="contenedor-sobrenosotros">
                <div className="columna-imagen">
                <div className="contenedor-imagen-ivan">
                    <img src={fotoIvan} alt="Foto Cdor. Iván Bellomo" className="img-ivan"/>
                    <div className="decoracion-imagen">
                    <img src={imgMonedita} alt="icono moneda" className="moneda moneda-superior"/>
                    <img src={imgMonedita} alt="icono moneda" className="moneda moneda-inferior"/>
                    </div>
                    {visibleSobreNosotros && (
                    <div className="badge-profesional">
                        <span className="badge-texto">Cdor. Iván Bellomo</span>
                        <div className="badge-linea"></div>
                    </div>
                    )}
                </div>
                </div>
                <div className="columna-texto">
                <div className="encabezado-seccion">
                    <h2 className="titulo-seccion">Sobre Nosotros</h2>
                    <div className="subrayado-titulo"></div>
                </div>
                
                <div className="contenido-textual">
                    <p className="parrafo-destacado">
                    Somos un estudio contable liderado por <strong>Iván Bellomo</strong>, Contador Público matriculado en el Consejo Profesional de CABA.
                    </p>
                    
                    <div className="card-informacion">
                    <p>Con amplia experiencia en materia tributaria y contable, ofrecemos asesoramiento integral a emprendimientos y empresas, tanto en Argentina como en el exterior.</p>
                    </div>

                    <div className="card-informacion">
                    <p>Trabajamos de manera personalizada y cercana, diseñando soluciones a medida que optimizan tus recursos y potencian tu crecimiento.</p>
                    </div>

                    <div className="valores-destacados">
                    <div className="valor-item">
                        <span className="icono-valor">✓</span>
                        <span>Confianza</span>
                    </div>
                    <div className="valor-item">
                        <span className="icono-valor">✓</span>
                        <span>Eficiencia</span>
                    </div>
                    <div className="valor-item">
                        <span className="icono-valor">✓</span>
                        <span>Acompañamiento</span>
                    </div>
                    </div>

                    <div className="llamado-accion">
                    <p className="texto-destacado">¡Estamos para ayudarte!</p>
                    <div className="decoracion-llamado"></div>
                    </div>
                </div>
                </div>
            </div>
            </section>
         <section className='secc-impacto' ref={refImpacto}>
            <h3>Contabilidad clara, sin estrés.</h3>
            <p>Nos ocupamos de tus obligaciones fiscales para que puedas enfocarte en hacer crecer tu negocio. Evitá errores y cumplí con ARCA sin complicaciones.</p>
            <div className='contenedor-caracteristicas'>
                <div className="caracteristica-impacto">
                    <span className="material-symbols-outlined">group</span>
                    <p className="numero">{visibleImpacto ? `+${clientes}` : '+0'} Clientes</p>
                    <p className='texto-impacto'>que confían mes a mes</p>
                </div>
                <span className='divisor-caracteristicas'></span>
                <div className="caracteristica-impacto">
                    <span className="material-symbols-outlined icono-impacto">corporate_fare</span>
                    <p className="numero">{visibleImpacto ? `${enfocados}%` : '0%'} Enfocados</p>
                    <p className='texto-impacto'>en PYMES y Emprendedores de Argentina</p>
                </div>
                <span className='divisor-caracteristicas'></span>
                <div className="caracteristica-impacto">
                    <span className="material-symbols-outlined icono-impacto">receipt_long</span>
                    <p className="numero">{visibleImpacto ? `+${facturas.toLocaleString()}` : '+0'}</p>
                    <p className='texto-impacto'>facturas emitidas</p>
                </div>
            </div>
         </section>
         <section className='servicios' id="Servicios" ref={refServicios}>
            <div className="contenedor-servicios">
                <div className="encabezado-servicios">
                <h2 className="titulo-servicios">Servicios Contables para Optimizar tu Negocio</h2>
                <div className="subrayado-servicios"></div>
                <p className="descripcion-servicios">
                    Soluciones integrales diseñadas para simplificar tu gestión fiscal y potenciar tu crecimiento
                </p>
                </div>

                <div className="grid-servicios">
                {/* Columna 1 */}
                <div className="columna-servicios">
                    <div className="card-servicio">
                    <div className="icono-servicio">
                        <span className="material-symbols-outlined">assignment_add</span>
                    </div>
                    <h3>Inscripción en Impuestos</h3>
                    <p>Monotributo, Responsable inscripto y sociedades</p>
                    </div>

                    <div className="card-servicio">
                    <div className="icono-servicio">
                        <span className="material-symbols-outlined">calculate</span>
                    </div>
                    <h3>Liquidación de Impuestos</h3>
                    <p>Nacionales, provinciales, mensuales y anuales</p>
                    </div>

                    <div className="card-servicio">
                    <div className="icono-servicio">
                        <span className="material-symbols-outlined">corporate_fare</span>
                    </div>
                    <h3>Constitución de Sociedades</h3>
                    <p>Asesoramiento completo para tu emprendimiento</p>
                    </div>

                    <div className="card-servicio">
                    <div className="icono-servicio">
                        <span className="material-symbols-outlined">payments</span>
                    </div>
                    <h3>Planes de Facilidades/Moratorias</h3>
                    <p>Regularizá tu situación fiscal de manera accesible</p>
                    </div>
                </div>

                <div className="columna-servicios">
                    <div className="card-servicio">
                    <div className="icono-servicio">
                        <span className="material-symbols-outlined">lock_open</span>
                    </div>
                    <h3>Levantamiento de Embargos</h3>
                    <p>Solucionamos tus problemas fiscales pendientes</p>
                    </div>

                    <div className="card-servicio">
                    <div className="icono-servicio">
                        <span className="material-symbols-outlined">trending_up</span>
                    </div>
                    <h3>Planificación Fiscal</h3>
                    <p>Estrategias para optimizar tu carga tributaria</p>
                    </div>

                    <div className="card-servicio">
                    <div className="icono-servicio">
                        <span className="material-symbols-outlined">account_balance</span>
                    </div>
                    <h3>Armado de Balances</h3>
                    <p>Presentaciones precisas y oportunas</p>
                    </div>

                    <div className="card-servicio">
                    <div className="icono-servicio">
                        <span className="material-symbols-outlined">receipt_long</span>
                    </div>
                    <h3>Certificaciones</h3>
                    <p>Documentación oficial para tus trámites</p>
                    </div>
                </div>

                <div className="columna-servicios">
                    <div className="card-servicio">
                    <div className="icono-servicio">
                        <span className="material-symbols-outlined">groups</span>
                    </div>
                    <h3>Liquidación de Sueldos</h3>
                    <p>Y gestión para casas particulares</p>
                    </div>

                    <div className="card-servicio">
                    <div className="icono-servicio">
                        <span className="material-symbols-outlined">description</span>
                    </div>
                    <h3>Gestión de Facturación</h3>
                    <p>A consumidor final o masiva de cobros</p>
                    </div>

                    <div className="card-servicio destacado">
                    <div className="icono-servicio">
                        <span className="material-symbols-outlined">person_check</span>
                    </div>
                    <h3>Asesoramiento Personalizado</h3>
                    <p>Solución específica para tu caso particular</p>
                    <HashLink smooth to="/contacto#FormularioDeContacto" className="btn-solicitar-info">Solicitar detalles</HashLink>
                    </div>
                </div>
                </div>
            </div>
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
         
         {/* <OpinionesGoogle />*/}
         
         <CintaEmpresas />
        </>
    );
}

export default Home;