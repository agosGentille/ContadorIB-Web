import { useEffect, useState } from "react";

import TarjetaPlanes from '../Components/PlanesCard';

import '../Styles/PlanesStyle.css';

import { API_BASE_URL } from '../config/api';

function Planes() {
    const [planesEmpresas, setPlanesEmpresas] = useState([]);
    const [planesMono, setPlanesMono] = useState([]);

    const [visibleEmpresas, setVisibleEmpresas] = useState([]);
    const [visibleMono, setVisibleMono] = useState([]);
    
    useEffect(() => {
        async function fetchPlanesEmpresas() {
            try {
                const respuesta = await fetch(`${API_BASE_URL}/planes/PlanesEmpresas`);
                const datos = await respuesta.json();

                const planesConUrl = datos.map(plan => ({
                    ...plan
                }));
                setPlanesEmpresas(planesConUrl);

                // Mostrar de a uno
                let i = 0;
                const interval = setInterval(() => {
                    if (i < planesConUrl.length) {
                        setVisibleEmpresas(prev => [...prev, planesConUrl[i]]);
                        i++;
                    } else {
                        clearInterval(interval);
                    }
                }, 200); // 200ms entre cada tarjeta
            } catch (error) {
                console.log(`Error: ${error}`);
            }
        }

        async function fetchPlanesMono() {
            try {
                const respuesta = await fetch(`${API_BASE_URL}/planes/PlanesEmprendedores`);
                const datos = await respuesta.json();

                const planesConUrl = datos.map(plan => ({
                    ...plan
                }));
                setPlanesMono(planesConUrl);

                let i = 0;
                const interval = setInterval(() => {
                    if (i < planesConUrl.length) {
                        setVisibleMono(prev => [...prev, planesConUrl[i]]);
                        i++;
                    } else {
                        clearInterval(interval);
                    }
                }, 200);
            } catch (error) {
                console.log(`Error: ${error}`);
            }
        }

        fetchPlanesEmpresas();
        fetchPlanesMono();
    }, []);

    return(
        <>
         <h2 className="titulo-planes" id="Planes">Planes adaptados a tus necesidades</h2>
         <section className="empresas">
            <h3>Paquetes mensuales para tus Empresas</h3>
            <div className="contendorPlanes">
                <TarjetaPlanes planes={planesEmpresas}/>
            </div>
         </section>
         <section className="emprendedores">
            <h3>Paquetes mensuales para Emprendedores</h3>
            <div className="contendorPlanes">
                 <TarjetaPlanes planes={planesMono}/>
            </div>
         </section>
        </>
    );
}

export default Planes;