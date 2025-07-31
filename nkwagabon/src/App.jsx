import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Accueil from "./pages/Accueil";
import Restaurants from "./pages/Restaurants";
import Evenements from "./pages/Evenements";
import Connexions from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import Compte from "./pages/Compte";
import Places from "./pages/Places";

// Layout & Admin pages
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Destinations from "./pages/admin/Destinations";
import Events from "./pages/admin/Events";
import AdminRestaurants from "./pages/admin/Restaurants";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname.startsWith("/admin") ? null : <Navbar />}
      <main className="container-fluid py-4">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/events" element={<Evenements />} />
          <Route path="/login" element={<Connexions />} />
          <Route path="/sign" element={<Inscription />} />
          <Route path="/compte" element={<Compte />} />
          <Route path="/places" element={<Places />} />

          {/* Admin Section */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="utilisateurs" element={<Users />} />
            <Route path="destinations" element={<Destinations />} />
            <Route path="restaurants" element={<AdminRestaurants />} />
            <Route path="evenements" element={<Events />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default function Wrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
