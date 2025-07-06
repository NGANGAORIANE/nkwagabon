
import React from 'react';

export default function Connexions() {
    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card p-4 shadow" style={{ width: '300px' }}>
                <h2 className="text-center mb-4">Connexion</h2>
                <input type="email" placeholder="Email" className="form-control mb-3" />
                <input type="password" placeholder="Mot de passe" className="form-control mb-3" />
                <button className="btn btn-success w-100">Se connecter</button>
            </div>
        </div>
    );
}
