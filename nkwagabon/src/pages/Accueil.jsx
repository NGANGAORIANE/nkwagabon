import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { trackVisit } from '../components/trackVisit';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function Accueil() {

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
            trackVisit("Accueil", user.uid);
            } else {
            trackVisit("Accueil", null);
            }
        });

        return () => unsubscribe(); 
    }, []);
    return (
        <div className="position-relative vh-100 overflow-hidden">
            <img
                src="/img/forest.jpg"
                alt="Gabon Nature"
                className="position-absolute w-100 h-100 object-fit-cover"
            />
            <div className="position-absolute top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-50 d-flex flex-column justify-content-center align-items-center">
                <h1 className="text-white fw-bold mb-4 display-4">Bienvenue au Gabon</h1>
                <Link to="/sign" className="btn btn-light text-success fw-bold">
                    Connecte-toi ou inscris-toi
                </Link>
            </div>
        </div>
    );
}
