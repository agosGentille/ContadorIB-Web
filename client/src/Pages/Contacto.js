
import { useState, useEffect } from 'react';
import '../Styles/ContactoStyle.css';

import FormularioContacto from '../Components/FormContacto';
import PreguntasFrecuentes from '../Components/PregFrecuentes';
import MapaUbicacion from '../Components/MapaUbicacion';

import { API_BASE_URL } from '../config/api';

function Contacto() {
    const [preguntas, setPreguntas] = useState([]);

    useEffect(() => {
        async function fetchPreguntas() {
            try {
                const respuesta = await fetch(`${API_BASE_URL}/PreguntasFrecuentes`);;
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

         <section id='Mapa'>
            <h2>Nuestra Ubicación</h2>
            <h3>Visitanos en Nuestro Estudio</h3>
            <MapaUbicacion/>
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