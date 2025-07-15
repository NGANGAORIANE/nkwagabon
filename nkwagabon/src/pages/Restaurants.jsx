import React, { useEffect, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
export default function Restaurants() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch('http://localhost:3000/restaurants')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des restaurants');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);
    const restaurants = [
        { id: 1, nom: 'Restaurant Nyembwé', specialite: 'Poulet sauce graine', km: 5, image: '/img/nyembwe.jpg' },
        { id: 2, nom: 'Chez Maman Jeanne', specialite: 'Feuilles de manioc', km: 7, image: '/img/manioc.jpg' },
    ];

    return (
        <div className="container py-4">
            <h2 className="mb-4 h3">Restaurants</h2>
            {loading ? (
                <Player
                    autoplay
                    loop
                    src="/loader.json"
                    style={{ height: '300px', width: '300px' }}
                />
            ) : error ? (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            ) : Array.isArray(data) && data.length === 0 ? (
                <div className="alert alert-info" role="alert">
                    Aucun restaurant trouvé.
                </div>
            ) :
                (
                    <div className="row">
                        {Array.isArray(data) && data.map(r => (
                            <div key={r.id} className="col-md-6 mb-4">
                                <div className="card h-100">
                                    <img src={r.photo} className="card-img-top" alt={r.nom} />
                                    <div className="card-body">
                                        <h5 className="card-title">{r.nom}</h5>
                                        <p className="card-text">{r.speciality}</p>
                                        <p className="card-text">{r.description}</p>
                                        <p className='card-text'>{r.number}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>


    );
}