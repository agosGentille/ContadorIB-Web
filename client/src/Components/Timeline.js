import '../Styles/HomeComponents/Timeline.css'
function Timeline (){
    return(
        <>
        <div className="timeline">
            <span id="linea-vertical"></span>
            <div className="elemento">
                <span className="punto"></span>
                <div className="caja-de-texto elemento-derecha">
                    <span className="indicador"></span>
                    <p className="titulo-elemento">Diagnóstico Flash</p>
                    <p className="texto-elemento">Revisamos tu situación fiscal, presentaciones pendientes y deudas.</p>
                </div>
            </div>
            <div className="elemento">
                <span className="punto"></span>
                <div className="caja-de-texto elemento-izquierda">
                    <span className="indicador"></span>
                    <p className="titulo-elemento">Evaluación  de riesgos</p>
                    <p className="texto-elemento">Estimamos impactos, riesgos y te sugerimos el camino más conveniente.</p>
                </div>
            </div>
            <div className="elemento">
                <span className="punto"></span>
                <div className="caja-de-texto elemento-derecha">
                    <span className="indicador"></span>
                    <p className="titulo-elemento">Plan de acción</p>
                    <p className="texto-elemento">Checklist accionable, presupuesto (si aplica) y conclusiones post sesión.</p>
                </div>
            </div>
        </div>
        </>
    );
}

export default Timeline;