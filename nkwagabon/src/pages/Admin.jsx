import React from 'react';

export default function Admin() {
    return (
        <div className="container-fluid py-5">
            <h1 className="h3 mb-4">Dashboard Admin</h1>
            <div className="row">
                <div className="col-md-4">
                    <div className="card text-bg-success mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Utilisateurs enregistrés</h5>
                            <p className="display-6">152</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Feedbacks récents</h5>
                            <ul>
                                <li>Restaurant Nyembwé très apprécié</li>
                                <li>Demande d’ajout d’événements à Port-Gentil</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}