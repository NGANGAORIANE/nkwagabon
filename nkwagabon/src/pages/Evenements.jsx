import React, { useEffect, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { trackVisit } from '../components/trackVisit';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import {fetchFavoris, addFavori, removeFavori} from './apiFavori';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export default function Events() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const [favoris, setFavoris] = useState([]);
    useEffect(() => {
        let isMounted = true; 

        // 1. Suivi utilisateur et visite
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
        try {
            await trackVisit("Événements", user ? user.uid : null);
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

        // 2. Récupération des événements
        const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:3000/events');
            if (!response.ok) throw new Error("Erreur lors de la récupération des événements");

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
    //les favoris
    const toggleFavori = async (evenementId) => {
        if (!userId) return;

        const type = 'lieu';

        try {
            if (favoris.includes(evenementId)) {
                await removeFavori({ user_id: userId, element_id: evenementId, type });
                setFavoris(prev => prev.filter(id => id !== evenementId));
            } else {
                await addFavori({ user_id: userId, element_id: evenementId, type });
                setFavoris(prev => [...prev, evenementId]);
            }
        } catch (err) {
            console.error("Erreur lors de la mise à jour des favoris", err);
        }
    };

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
                                onClick={(event) => {
                                    event.stopPropagation();
                                    toggleFavori(e.id);
                                }}
                                >
                                {favoris.includes(e.id) ? <FaHeart /> : <FaRegHeart />}
                                </div>
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
