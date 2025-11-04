import { useRef, useEffect, useState } from "react";

import Arauca from '../Images/Logo-Empresas/ARAUCA.png';
import Fajkar from '../Images/Logo-Empresas/FAJKAR.png';
import LaNubecita from '../Images/Logo-Empresas/LANUBECITA.png';
import PhoneHub from '../Images/Logo-Empresas/PHONEHUB.png';
import Rakkan from '../Images/Logo-Empresas/RAKKAN.png';
import RDComex from '../Images/Logo-Empresas/RDCOMEX.png';
import REKO from '../Images/Logo-Empresas/REKO.png';
import SAT from '../Images/Logo-Empresas/SAT.png';
import PrisaStudio from '../Images/Logo-Empresas/PRISASTUDIO.png';
import BioPrisma from '../Images/Logo-Empresas/BIOPRISMA.jpg';
import GrupoSLA from '../Images/Logo-Empresas/SLA.png';

function CintaEmpresas() {
  const scrollRef = useRef(null);

  const logos = [ Arauca, Fajkar, LaNubecita, PhoneHub, Rakkan, RDComex, REKO, SAT, PrisaStudio, BioPrisma, GrupoSLA ];



  return (
    <section className="secc-cinta"  style={{ whiteSpace: "nowrap" }}>
      <h2>Empresas que Confían en Nuestro Asesoramiento</h2>
      <div className="contenedor-cinta">
        <div className="cinta-logos" ref={scrollRef}>
          {[...logos, ...logos,  ...logos].map((logo, i) => (
            <img key={i} src={logo} alt={`Logo ${i}`} className="logo-empresa"/>
          ))}
        </div>
      </div>
      
    </section>
  );
}

export default CintaEmpresas;