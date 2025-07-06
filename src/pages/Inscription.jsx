import React from 'react';

export function Inscription() {
    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card p-4 shadow" style={{ width: '300px' }}>
                <h2 className="text-center mb-4">Inscription</h2>
                <input type="text" placeholder="Nom" className="form-control mb-3" />
                <input type="email" placeholder="Email" className="form-control mb-3" />
                <input type="password" placeholder="Mot de passe" className="form-control mb-3" />
                <button className="btn btn-success w-100">Créer un compte</button>
            </div>
        </div>
    );
}