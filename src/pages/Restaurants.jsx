import React from 'react';

export default function Restaurants() {
    const restaurants = [
        { id: 1, nom: 'Restaurant Nyembwé', specialite: 'Poulet sauce graine', km: 5, image: '/img/nyembwe.jpg' },
        { id: 2, nom: 'Chez Maman Jeanne', specialite: 'Feuilles de manioc', km: 7, image: '/img/manioc.jpg' },
    ];

    return (
        <div className="container py-4">
            <h2 className="mb-4 h3">Restaurants</h2>
            <div className="row">
                {restaurants.map(r => (
                    <div key={r.id} className="col-md-6 mb-4">
                        <div className="card h-100">
                            <img src={r.image} className="card-img-top" alt={r.nom} />
                            <div className="card-body">
                                <h5 className="card-title">{r.nom}</h5>
                                <p className="card-text">{r.specialite} • {r.km} km</p>
                                <button className="btn btn-outline-success">Voir l'itinéraire</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}