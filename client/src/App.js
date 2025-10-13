import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Components/Header';
import Footer from './Components/Footer';

import Home from './Pages/Home';
import Planes from './Pages/Planes';
import Contacto from './Pages/Contacto';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planes" element={<Planes />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
