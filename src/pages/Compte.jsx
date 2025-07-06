import React from 'react';

function Compte() {
    return (
        <div className="container py-5">
            <div className="card shadow p-4 mx-auto" style={{ maxWidth: '600px' }}>
                <h2 className="mb-4">Mon compte</h2>
                <div className="mb-3">
                    <label htmlFor="nom" className="form-label">Nom</label>
                    <input id="nom" type="text" className="form-control" defaultValue="Césarion" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input id="email" type="email" className="form-control" defaultValue="cesarion@email.com" />
                </div>
                <button className="btn btn-success">Mettre à jour</button>
            </div>
        </div>
    );
}

export default Compte;
