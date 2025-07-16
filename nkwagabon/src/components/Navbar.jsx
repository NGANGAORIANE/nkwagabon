import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success w-100 px-3">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold" to="/">Nkwagabon</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">

                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">
                            <Link to="/restaurants" className="nav-link">Restaurants</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/events" className="nav-link">Événements</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/places" className="nav-link">Lieux</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Connexion</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/sign" className="nav-link">Inscription</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
