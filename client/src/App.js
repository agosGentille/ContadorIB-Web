import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <h1>¡Nos mudamos! 🎉</h1>
        <p>Ahora estamos en estudiocbellomo.com.ar — te llevamos para allá...</p>
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
