import React, { useEffect, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

export default function Places() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/places')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des lieux");
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container py-4">
            <h2 className="mb-4 h3">Lieux à visiter</h2>
            {loading ? (
                <Player autoplay loop src="/loader.json" style={{ height: '300px', width: '300px' }} />
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : data.length === 0 ? (
                <div className="alert alert-info">Aucun lieu trouvé.</div>
            ) : (
                <div className="row">
                    {data.map(p => (
                        <div key={p.id} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <img src={p.photo || p.image} className="card-img-top" alt={p.name || p.nom} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name || p.nom}</h5>
                                    <p className="card-text">{p.description}</p>
                                    <p className="card-text text-muted">{p.adress || p.localisation}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
