import { useEffect, useState } from "react";

import TarjetaPlanes from '../Components/PlanesCard';
import PlanesSociedades from '../Components/PlanesSociedades';

import '../Styles/PlanesStyle.css';

import { API_BASE_URL } from '../Config/api.js';

function Planes() {
    //const [planesEmpresas, setPlanesEmpresas] = useState([]);
    //const [planesMono, setPlanesMono] = useState([]);
    const [planes, setPlanes] = useState([]);

    //const [visibleEmpresas, setVisibleEmpresas] = useState([]);
    //const [visibleMono, setVisibleMono] = useState([]);
    const [visible, setVisible] = useState([]);
    
    const [loading, setLoading] = useState(true);
    const [dots, setDots] = useState("");

    useEffect(() => {
        if (!loading) return; // solo anima mientras carga
        const interval = setInterval(() => {
            setDots(prev => (prev.length < 3 ? prev + "." : "")); 
        }, 500); // cada 500 ms agrega un punto o reinicia
        return () => clearInterval(interval);
    }, [loading]);

    useEffect(() => {
        async function fetchPlanes() {
            try {
                /*const [respEmpresas, respMono] = await Promise.all([
                    fetch(`${API_BASE_URL}/planes/PlanesEmpresas`),
                    fetch(`${API_BASE_URL}/planes/PlanesEmprendedores`)
                ]);*/

                /*const [datosEmpresas, datosMono] = await Promise.all([
                    respEmpresas.json(),
                    respMono.json()
                ]);*/
                const [resp] = await Promise.all([
                    fetch(`${API_BASE_URL}/planes/Planes`)
                ]);

                const datos = await resp.json();

                //setPlanesEmpresas(datosEmpresas);
                //setPlanesMono(datosMono);

                /*let i = 0, j = 0;
                const intervalEmp = setInterval(() => {
                    if (i < datosEmpresas.length) {
                        setVisibleEmpresas(prev => [...prev, datosEmpresas[i]]);
                        i++;
                    } else clearInterval(intervalEmp);
                }, 200);

                const intervalMono = setInterval(() => {
                    if (j < datosMono.length) {
                        setVisibleMono(prev => [...prev, datosMono[j]]);
                        j++;
                    } else clearInterval(intervalMono);
                }, 200);*/

                setPlanes(datos);

                let i = 0, j = 0;
                const interval = setInterval(() => {
                    if (i < datos.length) {
                        setVisible(prev => [...prev, datos[i]]);
                        i++;
                    } else clearInterval(interval);
                }, 200);

            } catch (error) {
                console.log(`Error: ${error}`);
            } finally {
                setLoading(false);
            }
        }

        fetchPlanes();
    }, []);

    return(
        <>
         <h2 className="titulo-planes" id="Planes">Planes adaptados a tus necesidades</h2>
         <section className="planes">
            <h3>Paquetes mensuales </h3>
            <div className="contendorPlanes">
                {loading ? ( 
                    <p
                    style={{
                        textAlign: "center",
                        fontSize: "1.2rem",
                        marginTop: "2rem",
                        fontWeight: "500",
                        transition: "opacity 0.3s ease"
                    }}
                >
                    Cargando{dots}
                </p>
                ) : (
                    <TarjetaPlanes planes={planes}/>
                )}
            </div>
         </section>
         
         <PlanesSociedades />
        </>
    );
}

export default Planes;