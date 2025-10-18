import { useState } from "react";

import '../Styles/HomeComponents/CondicionStyle.css'

function AcordeonCondiciones (){
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        // Si ya está abierto, cerrarlo; sino, abrirlo
        setOpenIndex(openIndex === index ? null : index);
    };

    const condiciones = [
        {
        id: 1,
        titulo: "Detalles de entrega",
        texto: "Entrega posterior: Minuta con conclusiones y próximos pasos en 24–48 h hábiles."
        },
        {
        id: 2,
        titulo: "Alcances",
        texto:
            "Esta sesión no incluye presentación de declaraciones juradas, altas/bajas, ni tramitaciones. Si se requiere, se cotiza por separado."
        },
        {
        id: 3,
        titulo: "Política de cambios y cancelaciones",
        texto: (
            <>
            <ul style={{ listStyleType: "disc", paddingLeft: "1.2rem" }}>
                <li>Podes reprogramar hasta 12 hs. antes.</li>
                <li>Cancelaciones con 24 hs. de antelación: Devolución del 100%.</li>
                <li>El valor puede actualizarse; el precio se congela al momento del pago.</li>
            </ul>
            </>
        )
        },
        {
        id: 4,
        titulo: "Confidencialidad",
        texto:
            "Toda la información se trata con carácter confidencial y uso profesional exclusivo."
        }
    ];

    return (
    <div className="acordeon">
    <p>Detalles clave y condiciones</p>
      {condiciones.map((item, index) => (
        <div key={item.id} className="acordeon-item">
           <div
            className={`acordeon-title ${openIndex === index ? "open" : ""}`}
            onClick={() => toggle(index)}
            >
                <span className={`acordeon-condicion ${openIndex === index ? "open" : "closed"}`}>
                    {item.titulo}
                    <span className="more-less material-symbols-outlined">
                        {openIndex === index ? "check_indeterminate_small" : "add"}
                    </span>
                </span>
            </div>
            <div className={`acordeon-content ${openIndex === index ? "open" : ""}`} style={{
                maxHeight: openIndex === index ? "200px" : "0px",
                padding: openIndex === index ? "10px" : "0 10px"
            }}>
                {item.texto}
            </div>
        </div>
      ))}
    </div>
  );
}

export default AcordeonCondiciones;