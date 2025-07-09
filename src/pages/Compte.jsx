import React from 'react';

function Compte() {
    return (
        <div className="container py-5">
            <div className="card shadow p-4 mx-auto" style={{ maxWidth: '600px' }}>
                <h2 className="mb-4">Mon compte</h2>

                <button className="btn btn-success">Mettre à jour</button>
            </div>
        </div>
    );
}

export default Compte;