import { useEffect, useState } from 'react';
import '../Styles/HomeComponents/CalendlyStyle.css';

function Calendly (){
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, []);

    return(
        <div className="secc-calendly">
            <p>Reservá tu lugar ahora con Calendly</p>
            <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/ivan-bellomo-contadorib/30min?hide_event_type_details=1&hide_gdpr_banner=1"
                data-locale="es"
            ></div>
        </div>
    );
}

export default Calendly;