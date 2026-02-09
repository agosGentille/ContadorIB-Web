import { HashLink  } from 'react-router-hash-link';

function PlanesCard({planes}){
    return(
        <>
      {planes.map((plan, index) => (
        <div className="tarjeta tarjeta-animada" key={plan.id} style={{ animationDelay: `${index * 0.2}s` }}>
          {/* 
          <div className='contenedor-img'>
            <img src={plan.imagen} alt={plan.titulo} className="tarjeta-img" />
          </div>
          */}
          <div className="tarjeta-body">
            <h4 className="tarjeta-title">{plan.titulo}</h4>
            {plan.precio && (
              <div className="tarjeta-precio">
                <span className="precio">{plan.precio}</span>
                {plan.destacado && (
                  <span className="badge-destacado">{plan.destacado}</span>
                )}
              </div>
            )}
            <ul className="tarjeta-list">
              {plan.caracteristicas.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            {plan.opcional && (
                <div className="opcional-container">
                    <div className="opcional-badge">
                        <span className="opcional-icon">+</span>
                        <span className="opcional-texto">Opcional adicional</span>
                    </div>
                    <p className="opcional-descripcion">{plan.opcional}</p>
                    </div>
            )}

            <HashLink smooth to="/contacto#FormularioDeContacto" className="tarjeta-link">Solicitar detalles</HashLink>
            
          </div>
          <div className='linea-decorativa'>
            <span className='barra-decorativa'></span>
            <span className='barra-decorativa'></span>
            <span className='barra-decorativa'></span>
            <span className='barra-decorativa'></span>
          </div>
        </div>
      ))}
    </>
    );
}

export default PlanesCard;