import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react";

import Header from './Components/Header';
import Footer from './Components/Footer';

import Home from './Pages/Home';
import Planes from './Pages/Planes';
import Simulador from './Pages/SimuladorRegimenes';
import Contacto from './Pages/Contacto';
import ThankYouPage from './Pages/ThankYou';
import NotFound from './Pages/NotFound';

import './App.css';
import './Styles/Theme.css';
import './Styles/Mudanza.css';

function App() {
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (window.location.hostname.includes("contadorib.com.ar")) {
      setRedirecting(true);
      setTimeout(() => {
        window.location.href = "https://estudiocbellomo.com.ar";
      }, 4000);
    }
  }, []);

  if (redirecting) {
  return (
    <div className="mudanza-page">
      <div className="decoracion-circulo-1"></div>
      <div className="decoracion-circulo-2"></div>
      <div className="mudanza-container">
        <div className="mudanza-icono">🏡</div>
        <h1 className="mudanza-titulo">¡Nos mudamos!</h1>
        <div className="mudanza-subrayado"></div>
        <p className="mudanza-mensaje">
          Ahora estamos en <strong>estudiocbellomo.com.ar</strong><br />
          Te llevamos para allá en un segundo...
        </p>
        <div className="mudanza-barra-container">
          <div className="mudanza-barra"></div>
        </div>
        <p className="mudanza-link-manual">
          ¿No pasa nada? <a href="https://estudiocbellomo.com.ar">Hacé clic acá</a>
        </p>
      </div>
    </div>
  );
}

  return (
    <Router>
      <Header />
      <main className='componentes'>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planes" element={<Planes />} />
        <Route path="/simulador" element={<Simulador />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/gracias" element={<ThankYouPage />} />

        {/* Ruta 404 - debe ir al final */}
          <Route path="*" element={<NotFound />} />
      </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
