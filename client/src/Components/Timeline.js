import { useEffect } from "react";
import '../Styles/HomeComponents/Timeline.css'

function Timeline (){
    useEffect(() => {
        const elementos = document.querySelectorAll(".elemento");

        const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
            });
        },
        { threshold: 0.2 } 
        );

        elementos.forEach(el => observer.observe(el));

        return () => elementos.forEach(el => observer.unobserve(el));
    }, []);
    return(
        <>
        <div className="timeline">
            <span id="linea-vertical"></span>
            <div className='elementos'>
                <div className="elemento elemento-derecha">
                    <span className="punto"></span>
                    <div className="caja-de-texto">
                        <span className="indicador"></span>
                        <p className="titulo-elemento">Diagnóstico Flash</p>
                        <p className="texto-elemento">Revisamos tu situación fiscal, presentaciones pendientes y deudas.</p>
                    </div>
                </div>
                <div className="elemento elemento-izquierda">
                    <span className="punto"></span>
                    <div className="caja-de-texto">
                        <span className="indicador"></span>
                        <p className="titulo-elemento">Evaluación  de riesgos</p>
                        <p className="texto-elemento">Estimamos impactos, riesgos y te sugerimos el camino más conveniente.</p>
                    </div>
                </div>
                <div className="elemento elemento-derecha">
                    <span className="punto"></span>
                    <div className="caja-de-texto">
                        <span className="indicador"></span>
                        <p className="titulo-elemento">Plan de acción</p>
                        <p className="texto-elemento">Checklist accionable, presupuesto (si aplica) y conclusiones post sesión.</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Timeline;