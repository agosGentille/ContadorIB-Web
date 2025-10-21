import '../Styles/ContactoStyle.css';

function MapaUbicacion() {
    return(
        <div className="contenedor-mapa">
            <div className="mapa-frame">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3291.112365069012!2d-58.57982392447239!3d-34.42403107295516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bca5d65214d6f3%3A0xdcfe02340fca3636!2sContador%20IB!5e0!3m2!1ses-419!2sar!4v1700000000000!5m2!1ses-419!2sar"
                    width="100%" 
                    height="100%"
                    style={{ border: 0, borderRadius: '12px' }}
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación Estudio Contable IB"
                >
                </iframe>
            </div>
            
            <div className="info-ubicacion">
                <div className="item-info">
                    <span className="material-symbols-outlined">location_on</span>
                    <div>
                        <h4>Estudio Contable IB</h4>
                        <p>Av. Dardo Rocha 1038</p>
                        <p>Tigre, Buenos Aires</p>
                    </div>
                </div>
                
                <div className="item-info">
                    <span className="material-symbols-outlined">schedule</span>
                    <div>
                        <h4>Horarios de Atención</h4>
                        <p>Lunes a Viernes: 9:00 - 18:00</p>
                        <p>Sábados: 9:00 - 13:00</p>
                    </div>
                </div>
                
                <a 
                    href="https://maps.google.com/?q=Contador+IB,+Av.+Dardo+Rocha+1038,+Tigre,+Buenos+Aires"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-direcciones"
                >
                    <span className="material-symbols-outlined">directions</span>
                    Cómo llegar
                </a>
            </div>
        </div>
    );
}

export default MapaUbicacion;