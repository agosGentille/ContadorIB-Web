import { useRef, useEffect, useState } from "react";

import Arauca from '../Images/Logo Empresas/ARAUCA.PNG';
import Fajkar from '../Images/Logo Empresas/FAJKAR.PNG';
import LaNubecita from '../Images/Logo Empresas/LANUBECITA.PNG';
import PhoneHub from '../Images/Logo Empresas/PHONEHUB.PNG';
import Rakkan from '../Images/Logo Empresas/RAKKAN.PNG';
import RDComex from '../Images/Logo Empresas/RDCOMEX.PNG';
import REKO from '../Images/Logo Empresas/REKO.PNG';
import SAT from '../Images/Logo Empresas/SAT.PNG';
import PrisaStudio from '../Images/Logo Empresas/PRISASTUDIO.PNG';

function CintaClientes() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const speed = 0.8; // velocidad
    let animationId;

    const autoScroll = () => {
      scrollContainer.scrollLeft += speed;
      if (
        scrollContainer.scrollLeft >=
        scrollContainer.scrollWidth - scrollContainer.clientWidth
      ) {
        scrollContainer.scrollLeft = 0;
      }

      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);

    // Limpieza
    return () => cancelAnimationFrame(animationId);
  }, []);

  const logos = [
    Arauca,
    Fajkar,
    LaNubecita,
    PhoneHub,
    Rakkan,
    RDComex,
    REKO,
    SAT,
    PrisaStudio,
  ];

  return (
    <section className="cinta-clientes">
      <h2>Empresas que Confían en Nuestro Asesoramiento</h2>

      <div className="cinta" ref={scrollRef}>
        {/* 🔁 Se duplican 3 veces para suavizar el loop */}
        {[...logos, ...logos, ...logos].map((logo, i) => (
          <img key={i} src={logo} alt={`Logo ${i}`} />
        ))}
      </div>
    </section>
  );
}

export default CintaClientes;