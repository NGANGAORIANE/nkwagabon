import React, { useEffect, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

export default function Events() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/events')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des événements");
                }
                return response.json();
            })
            .then(data => {
                console.log("Événements reçus :", data);
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
            <h2 className="mb-4 h3">Événements culturels</h2>
            {loading ? (
                <Player autoplay loop src="/loader.json" style={{ height: '300px', width: '300px' }} />
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : data.length === 0 ? (
                <div className="alert alert-info">Aucun événement trouvé.</div>
            ) : (
                <div className="row">
                    {data.map(e => (
                        <div key={e.id} className="col-md-6 mb-4">
                            <div className="card h-100">
                                <img src={e.photo} className="card-img-top" alt={e.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{e.name}</h5>
                                    <p className="card-text">
                                        {e.date} • {e.adress}
                                    </p>
                                    {e.description && (
                                        <p className="card-text">{e.description}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
