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
    const container = scrollRef.current;
    if (!container) return;

    const speed = 0.5; // velocidad del scroll
    let rafId;

    const scroll = () => {
      container.scrollLeft += speed;

      // Reinicia cuando alcanza la mitad
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }

      rafId = requestAnimationFrame(scroll);
    };

    rafId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(rafId);
  }, []);

  const logos = [ Arauca, Fajkar, LaNubecita, PhoneHub, Rakkan, RDComex, REKO, SAT, PrisaStudio, ];

  return (
    <section className="cinta-clientes"  style={{ whiteSpace: "nowrap" }}>
      <h2>Empresas que Confían en Nuestro Asesoramiento</h2>

      <div className="cinta" ref={scrollRef}>
        {[...logos, ...logos].map((logo, i) => (
          <img key={i} src={logo} alt={`Logo ${i}`} />
        ))}
      </div>
    </section>
  );
}

export default CintaClientes;