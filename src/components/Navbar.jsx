import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success px-3">
            <Link className="navbar-brand fw-bold" to="/">Nkwagabon</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item"><Link to="/" className="nav-link">Accueil</Link></li>
                    <li className="nav-item"><Link to="/restaurants" className="nav-link">Restaurants</Link></li>
                    <li className="nav-item"><Link to="/evenements" className="nav-link">Événements</Link></li>
                    <li className="nav-item"><Link to="/compte" className="nav-link">Compte</Link></li>
                    <li className="nav-item"><Link to="/admin" className="nav-link">Admin</Link></li>
                </ul>
            </div>
        </nav>
    );
}
