
import { useState } from 'react';
import '../Styles/ContactoStyle.css';

import FormularioContacto from '../Components/FormContacto';

function Contacto() {

    return(
        <>
         <section id='FormularioDeContacto'>
            <h2>Dejanos tu contacto y te enviamos la información de nuestros servicios.</h2>
            <FormularioContacto/>
         </section>

         <section id='FAQ'>
            <h2>FAQ</h2>
            <h3>Preguntas Frecuentes</h3>
         </section>
        </>
    );
}

export default Contacto;