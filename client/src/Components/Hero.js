import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import '../Styles/HeroStyle.css';

import fondoCarpetas from '../Images/Slide1.PNG';
import fondoLaptop from '../Images/Slide2.PNG';
import fondoLupa from '../Images/Slide3.PNG';
import fondoCalculadora from '../Images/Slide4.PNG';

const NUMERO_WSP = "5491131214776";

const slides = [
  {
    eyebrow: "Servicio Profesional",
    titulo: "Estudio Contable",
    texto: "Asesoría en impuestos, sueldos y cargas sociales, auditoría y contabilidad.",
    fondo: fondoCarpetas,
  },
  {
    eyebrow: "Atención Ágil",
    titulo: "Todo resuelto sin moverte",
    texto: "Operamos 100% online, con respuestas rápidas y comunicación directa por WhatsApp.",
    fondo: fondoLaptop,
  },
  {
    eyebrow: "Cumplimiento al Día",
    titulo: "Sin sorpresas fiscales",
    texto: "Vencimientos, categorizaciones y presentaciones controladas para que no te falte nada.",
    fondo: fondoLupa,
  },
  {
    eyebrow: "Para Cada Etapa",
    titulo: "Desde el inicio hasta crecer",
    texto: "Te acompañamos desde el monotributo hasta la constitución de tu sociedad.",
    fondo: fondoCalculadora,
  },
];

const TIEMPO_SLIDE = 5000;
const UMBRAL_ARRASTRE = 80;

function Hero() {
  const [indice, setIndice] = useState(0);
  const [direccion, setDireccion] = useState(1);
  const totalSlides = slides.length;

  const irAlSiguiente = () => {
    setDireccion(1);
    setIndice((prev) => (prev + 1) % totalSlides);
  };

  const irAlAnterior = () => {
    setDireccion(-1);
    setIndice((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const irAIndice = (i) => {
    setDireccion(i > indice ? 1 : -1);
    setIndice(i);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDireccion(1);
      setIndice((prev) => (prev + 1) % totalSlides);
    }, TIEMPO_SLIDE);
    return () => clearInterval(timer);
  }, [indice, totalSlides]);

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -UMBRAL_ARRASTRE) {
      irAlSiguiente();
    } else if (info.offset.x > UMBRAL_ARRASTRE) {
      irAlAnterior();
    }
  };

  const irAWhatsapp = () => {
    const mensaje = "Hola! Quiero info sobre sus servicios contables.";
    const url = "https://wa.me/" + NUMERO_WSP + "?text=" + encodeURIComponent(mensaje);
    window.open(url, "_blank");
  };

  const slideActual = slides[indice];

  const variantes = {
    entra: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    centro: { opacity: 1, x: 0 },
    sale: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <section className="hero" id="Inicio">
      {/* Fondos de imagen: uno por slide, con crossfade */}
      <div className="hero-fondos">
        <AnimatePresence>
          <motion.div
            key={indice}
            className="hero-fondo-img"
            style={{ backgroundImage: `url(${slideActual.fondo})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
        <div className="hero-fondo-overlay"></div>
      </div>

      <motion.div
        className="hero-drag-area"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
      />

      <button className="hero-flecha hero-flecha-izq" onClick={irAlAnterior} aria-label="Slide anterior" type="button">‹</button>

      <div className="hero-contenido">
        <AnimatePresence mode="wait" custom={direccion}>
          <motion.div
            key={indice}
            custom={direccion}
            variants={variantes}
            initial="entra"
            animate="centro"
            exit="sale"
            transition={{ duration: 0.4 }}
            className="hero-slide"
          >
            <p className="hero-eyebrow">{slideActual.eyebrow}</p>
            <h2 className="hero-titulo">{slideActual.titulo}</h2>
            <p className="hero-texto">{slideActual.texto}</p>
          </motion.div>
        </AnimatePresence>

        <button className="hero-btn" onClick={irAWhatsapp}>Contactanos ahora</button>

        <div className="hero-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`hero-dot ${i === indice ? "activo" : ""}`}
              onClick={() => irAIndice(i)}
              aria-label={`Ir al slide ${i + 1}`}
              type="button"
            />
          ))}
        </div>
      </div>

      <button className="hero-flecha hero-flecha-der" onClick={irAlSiguiente} aria-label="Siguiente slide" type="button">›</button>
    </section>
  );
}

export default Hero;