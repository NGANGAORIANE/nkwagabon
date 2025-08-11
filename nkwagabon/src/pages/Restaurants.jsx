import React, { useEffect, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { trackVisit } from '../components/trackVisit';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import MenuSlider from './MenuSlide';
import {fetchFavoris, addFavori, removeFavori} from './apiFavori';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export default function Restaurants() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [favoris, setFavoris] = useState([]);


    useEffect(() => {
        let isMounted = true;

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            try {
                await trackVisit("Restaurants", user ? user.uid : null);

                if (user && isMounted) {
                    setUserId(user.uid);

                    try {
                        const favorisData = await fetchFavoris(user.uid);
                        setFavoris(favorisData.map(f => f.element_id));
                    } catch (err) {
                        console.error('Erreur lors du chargement des favoris :', err);
                    }
                }
            } catch (err) {
                console.error("Erreur lors du tracking :", err);
            }
        });

        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:3000/restaurants');
                if (!response.ok) throw new Error("Erreur lors de la récupération des restaurants");

                const events = await response.json();
                if (isMounted) {
                    setData(events);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                    setLoading(false);
                }
            }
        };

        fetchEvents();

        return () => {
            isMounted = false;
            unsubscribe();
        };
    }, []);

    const restaurants = [
        { id: 1, nom: 'Restaurant Nyembwé', specialite: 'Poulet sauce graine', km: 5, image: '/img/nyembwe.jpg' },
        { id: 2, nom: 'Chez Maman Jeanne', specialite: 'Feuilles de manioc', km: 7, image: '/img/manioc.jpg' },
    ];
    const handleRestaurantClick = (id) => {
        setSelectedRestaurantId((prev) => (prev === id ? null : id));
    };
    //les favoris
    const toggleFavori = async (restaurantId) => {
        if (!userId) return;

        const type = 'restaurant';

        try {
            if (favoris.includes(restaurantId)) {
                await removeFavori({ user_id: userId, element_id: restaurantId, type });
                setFavoris(prev => prev.filter(id => id !== restaurantId));
            } else {
                await addFavori({ user_id: userId, element_id: restaurantId, type });
                setFavoris(prev => [...prev, restaurantId]);
            }
        } catch (err) {
            console.error("Erreur lors de la mise à jour des favoris", err);
        }
    };


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
                            <div key={r.id} className="col-md-6 mb-4 position-relative">
                                <div
                                    className="card h-100"
                                    onClick={() => handleRestaurantClick(r.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div
                                    style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        zIndex: 10,
                                        fontSize: '1.5rem',
                                        color: 'red',
                                        cursor: 'pointer',
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavori(r.id);
                                    }}
                                    >
                                    {favoris.includes(r.id) ? <FaHeart /> : <FaRegHeart />}
                                    </div>

                                    <img src={r.photo} className="card-img-top" alt={r.nom} />
                                    <div className="card-body">
                                    <h5 className="card-title">{r.nom}</h5>
                                    <p className="card-text">{r.speciality}</p>
                                    <p className="card-text">{r.description}</p>
                                    <p className="card-text">{r.number}</p>
                                    </div>
                                </div>

                                {selectedRestaurantId === r.id && (
                                <>
                                    <div
                                    style={{
                                        position: 'fixed',
                                        top: 0,
                                        left: 0,
                                        width: '100vw',
                                        height: '100vh',
                                        background: 'rgba(0, 0, 0, 0.5)',
                                        zIndex: 99999,
                                    }}
                                    onClick={() => setSelectedRestaurantId(null)} // clic pour fermer
                                    />
                                    <MenuSlider restaurantId={r.id} onClose={() => setSelectedRestaurantId(null)} />
                                </>
                                )}

                        </div>

                        ))}
                    </div>
                )
            }
        </div>


    );
}