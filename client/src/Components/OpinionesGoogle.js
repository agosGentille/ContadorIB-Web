import { useEffect } from "react";

function OpinionesGoogle() {

  useEffect(() => {
    // Verificamos si el script ya está cargado para no duplicarlo
    if (!document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')) {
      const script = document.createElement("script");
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="secc-opiniones">
      <h3>Comerciantes como vos que ya vieron resultados!</h3>
      <div 
        className="elfsight-app-21df6b1e-76b2-49b2-aaa6-e1d8db028b5b" 
        data-elfsight-app-lazy>
      </div>
    </section>
  );
}

export default OpinionesGoogle;