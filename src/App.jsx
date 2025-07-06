import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Restaurants from "./pages/Restaurants";
import Evenements from "./pages/Evenements";
import Connexions from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import Compte from "./pages/Compte";
import Admin from "./pages/Admin";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/evenements" element={<Evenements />} />
        <Route path="/login" element={<Connexions />} />
        <Route path="/register" element={<Inscription />} />
        <Route path="/compte" element={<Compte />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
