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

function CintaEmpresas() {
  const scrollRef = useRef(null);

  const logos = [ Arauca, Fajkar, LaNubecita, PhoneHub, Rakkan, RDComex, REKO, SAT, PrisaStudio, ];



  return (
    <section className="secc-cinta"  style={{ whiteSpace: "nowrap" }}>
      <h2>Empresas que Confían en Nuestro Asesoramiento</h2>
      <div className="contenedor-cinta">
        <div className="cinta-logos" ref={scrollRef}>
          {[...logos, ...logos].map((logo, i) => (
            <img key={i} src={logo} alt={`Logo ${i}`} className="logo-empresa"/>
          ))}
        </div>
      </div>
      
    </section>
  );
}

export default CintaEmpresas;