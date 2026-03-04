import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Components/Header';
import Footer from './Components/Footer';

import Home from './Pages/Home';
import Planes from './Pages/Planes';
import Contacto from './Pages/Contacto';
import ThankYouPage from './Pages/ThankYou';
import NotFound from './Pages/NotFound';

import './App.css';
import './Styles/Theme.css';

function App() {
  return (
    <Router>
      <Header />
      <main className='componentes'>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planes" element={<Planes />} />
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
