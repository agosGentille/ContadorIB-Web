import { useEffect, useRef, useState } from 'react';
import { HashLink  } from 'react-router-hash-link';

//import fotoIvan from '../Images/foto_ivan.jpg';
import fotoIvan from '../Images/foto_ivan.png';
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

    const facturas = useCounter(300);
    const clientes = useCounter(60);
    const enfocados = useCounter(100);
    
    return(
        <>
         <section className="Inicio" id="Inicio">
            <h2 className='titulo-inicio'>¿Querés estar al día y pagar lo justo, sin estrés?</h2>
            <div className="texto-con-iconos">
                <div className="icono-texto">
                <span className="icono">✓</span>
                <p className="texto-item">Cumplí en tiempo y forma</p>
                </div>
                <div className="icono-texto">
                <span className="icono">✓</span>
                <p className="texto-item">Optimizá tu carga fiscal dentro de la ley</p>
                </div>
                <div className="icono-texto">
                <span className="icono">✓</span>
                <p className="texto-item">Olvidate de las sorpresas</p>
                </div>
            </div>
            
            <p className='texto-destacado'>
                <strong>Nos encargamos de tus impuestos y tu contabilidad</strong> para que solo te concentres en lo importante.
            </p>
            
            <HashLink smooth to="/contacto#FormularioDeContacto" className='btn-contactanos'>
                ¡CONTACTANOS AHORA!
            </HashLink>
            </section>

         <section className="Sobre-Nosotros" id="SobreNosotros" ref={refSobreNosotros}>
            <div className="contenedor-sobrenosotros">
                <div className="columna-imagen">
                <div className="contenedor-imagen-ivan">
                    <img src={fotoIvan} alt="Foto Cdor. Iván Bellomo" className="img-ivan"/>
                    <div className="decoracion-imagen">
                    {/*<img src={imgMonedita} alt="icono moneda" className="moneda moneda-superior"/>
                    <img src={imgMonedita} alt="icono moneda" className="moneda moneda-inferior"/> */}
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
                    Somos un estudio contable liderado por el <strong>Cdor. Iván Bellomo</strong>, con matrícula en CABA, PBA y San Luis. Acompañamos a Pymes con una gestión contable e impositiva clara y ordenada.
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
                    <p className='texto-impacto'>confían en nosotros cada mes</p>
                </div>
                <span className='divisor-caracteristicas'></span>
                <div className="caracteristica-impacto">
                    <span className="material-symbols-outlined icono-impacto">location_on </span>
                    <p className="numero">{visibleImpacto ? `${enfocados}%` : '0%'} Enfocados</p>
                    <p className='texto-impacto'>en impulsar PYMES y Emprendedores argentinos</p>
                </div>
                <span className='divisor-caracteristicas'></span>
                <div className="caracteristica-impacto">
                    <span className="material-symbols-outlined icono-impacto">receipt_long</span>
                    <p className="numero">{visibleImpacto ? `+${facturas.toLocaleString()}` : '+0'}</p>
                    <p className='texto-impacto'>gestiones impositivas concretadas con éxito</p>
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
                {/* Columna 1 - Nuestros Planes */}
                <div className="columna-servicios">
                    <HashLink smooth to="/planes#Planes" className="card-servicio destacado">
                    <div className="icono-servicio">
                        <span className="material-symbols-outlined">layers</span>
                    </div>
                    <h3>Nuestros Planes Contables</h3>
                    <p>Soluciones integrales adaptadas a cada etapa de tu negocio, desde monotributo hasta empresas consolidadas</p>
                    </HashLink>
                </div>

                {/* Columna 2 - Constitución de Sociedades */}
                <div className="columna-servicios">
                    <HashLink smooth to="/planes#Sociedades" className="card-servicio destacado">
                    <div className="icono-servicio">
                        <span className="material-symbols-outlined">gavel</span>
                    </div>
                    <h3>Constitución de Sociedades</h3>
                    <p>Asesoramiento completo para formalizar tu empresa, desde la elección del tipo societario hasta la inscripción final</p>
                    </HashLink>
                </div>

                {/* Columna 3 - Asesoramiento Personalizado */}
                <div className="columna-servicios">
                    <div className="card-servicio destacado">
                    <div className="icono-servicio">
                        <span className="material-symbols-outlined">person_check</span>
                    </div>
                    <h3>Asesoramiento Personalizado</h3>
                    <p>Solución específica para tu caso particular con atención directa de nuestros expertos contables</p>
                    <HashLink smooth to="/contacto#FormularioDeContacto" className="btn-solicitar-info">Solicitar detalles</HashLink>
                    </div>
                </div>
                </div>
            </div>
        </section>
        <section className='PorQueElegirnos' id='PorQueElegirnos'>
            <div className='eleginos'>
                <div className="encabezado-eleginos">
                    <h2 className="titulo-eleginos">¿Por qué elegir nuestro estudio?</h2>
                    <div className="subrayado-eleginos"></div>
                    <p className="descripcion-eleginos">
                        La combinación perfecta entre tecnología, especialización y atención personalizada
                    </p>
                </div>

                <div className="beneficios-grid">
                    <div className="beneficio-item">
                        <div className="icono-beneficio">
                            <span className="material-symbols-outlined">bolt</span>
                        </div>
                        <h3>Respuesta inmediata 24/7</h3>
                        <p>Operamos íntegramente online y nuestro tiempo medio de respuesta es inferior a 24h. Tu consulta no espera.</p>
                    </div>

                    <div className="beneficio-item">
                        <div className="icono-beneficio">
                            <span className="material-symbols-outlined">engineering</span>
                        </div>
                        <h3>Equipo especializado multidisciplinario</h3>
                        <p>Reunimos contadores, tributaristas, despachantes y analistas financieros formados en las normativas más recientes.</p>
                    </div>

                    <div className="beneficio-item">
                        <div className="icono-beneficio">
                            <span className="material-symbols-outlined">chat</span>
                        </div>
                        <h3>Canal directo en WhatsApp</h3>
                        <p>Creamos un grupo exclusivo con nuestros especialistas. Existe una comunicación fluida con todo el equipo y resolvemos tus dudas al instante por el canal que prefieras.</p>
                    </div>

                    <div className="beneficio-item">
                        <div className="icono-beneficio">
                            <span className="material-symbols-outlined">trending_up</span>
                        </div>
                        <h3>Estrategias de ahorro fiscal</h3>
                        <p>Diseñamos esquemas legales que optimizan la carga tributaria y mejoran tu flujo de caja, utilizando beneficios vigentes, diferimientos y regímenes especiales.</p>
                    </div>

                    <div className="beneficio-item">
                        <div className="icono-beneficio">
                            <span className="material-symbols-outlined">star</span>
                        </div>
                        <h3>Calificación perfecta</h3>
                        <p>Nuestra reputación de 5★ refleja la satisfacción de clientes que valoran transparencia, cercanía y resultados tangibles.</p>
                    </div>

                    <div className="beneficio-item">
                        <div className="icono-beneficio">
                            <span className="material-symbols-outlined">stacked_line_chart</span>
                        </div>
                        <h3>Servicio escalable</h3>
                        <p>Desde el alta en Monotributo hasta la gestión integral de PyMEs, escalamos el soporte según tus necesidades y crecimiento.</p>
                    </div>

                    <div className="beneficio-item">
                        <div className="icono-beneficio">
                            <span className="material-symbols-outlined">update</span>
                        </div>
                        <h3>Equipo siempre actualizado</h3>
                        <p>Equipo joven, especializado y siempre actualizado con los últimos cambios normativos y herramientas digitales.</p>
                    </div>
                    <div className="beneficio-item">
                        <div className="icono-beneficio">
                            <span className="material-symbols-outlined">code</span>
                        </div>
                        <h3>Tecnologías de gestión avanzada</h3>
                        <p>Utilizamos herramientas profesionales como <strong>Acont</strong>, <strong>Afippi</strong> y <strong>Xubio</strong> para llevar tu contabilidad de forma ordenada, ágil y precisa.</p>
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
                        <p className="title-reu">$80.000 ARS</p>
                        <p className='texto-reu'>Precio final</p>
                    </div>
                </div> 
                <p><b>Pago Anticipado para confirmar la reserva.</b></p>
                <p>* Transferencia bancaria al Alias ivan.bellomo </p>
                <p>Se emite Factura C</p>
            </div>
            
            <AcordeonCondiciones />
            
            <Calendly/>
            
         </section>
         
         <OpinionesGoogle />
         
         <CintaEmpresas />
        </>
    );
}

export default Home;
