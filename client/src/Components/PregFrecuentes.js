import { useState } from "react";

const PreguntasFrecuentes = ({ preguntas }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    // Si ya está abierto, cerrarlo; sino, abrirlo
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {preguntas.map((item, index) => (
        <div key={item.id} className="accordion-item">
           <div
            className={`accordion-title ${openIndex === index ? "open" : ""}`}
            onClick={() => toggle(index)}
            >
                <span className={`status-bar ${openIndex === index ? "open" : "closed"}`}>  </span>
                <span className="btnPregunta">
                    {item.pregunta}
                    <span className="arrow">keyboard_arrow_down</span>
                </span>
            </div>
            <div className={`accordion-content ${openIndex === index ? "open" : ""}`} style={{
                maxHeight: openIndex === index ? "200px" : "0px",
                padding: openIndex === index ? "10px" : "0 10px"
            }}>
                {item.respuesta}
            </div>
        </div>
      ))}
    </div>
  );
};

export default PreguntasFrecuentes;