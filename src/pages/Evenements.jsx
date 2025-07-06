import React from 'react';

export default function Evenements() {
    const evenements = [
        { id: 1, titre: "Fête de la Musique", date: "21 juin", lieu: "Centre culturel", image: "/img/musique.jpg" },
        { id: 2, titre: "Danse de l'Ekpe", date: "7 juillet", lieu: "Palais royal", image: "/img/ekpe.jpg" },
    ];

    return (
        <div className="container py-4">
            <h2 className="mb-4 h3">Événements culturels</h2>
            <div className="row">
                {evenements.map(e => (
                    <div key={e.id} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <img src={e.image} className="card-img-top" alt={e.titre} />
                            <div className="card-body">
                                <h5 className="card-title">{e.titre}</h5>
                                <p className="card-text">{e.date} • {e.lieu}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
