
import { useState, useEffect } from 'react';
import '../Styles/ContactoStyle.css';

import FormularioContacto from '../Components/FormContacto';
import PreguntasFrecuentes from '../Components/PregFrecuentes';

function Contacto() {
    const [preguntas, setPreguntas] = useState([]);

    useEffect(() => {
        async function fetchPreguntas() {
            try {
                const respuesta = await fetch('http://localhost:5000/api/PreguntasFrecuentes');
                const datos = await respuesta.json();
                
                setPreguntas(datos);
            } catch (error) {
                console.log(`Error: ${error}`);
            }
        }
        fetchPreguntas();
    }, []);


    return(
        <>
         <section id='FormularioDeContacto'>
            <h2>Dejanos tu contacto y te enviamos la información de nuestros servicios.</h2>
            <FormularioContacto/>
         </section>

         <section id='FAQ'>
            <h2>FAQ</h2>
            <h3>Preguntas Frecuentes</h3>
            <PreguntasFrecuentes preguntas={preguntas}/>
         </section>
        </>
    );
}

export default Contacto;