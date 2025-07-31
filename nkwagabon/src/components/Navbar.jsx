import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';

export default function Navbar() {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (u) => {
            setUser(u);
            if (u) {
                const docRef = doc(db, 'users', u.uid);
                const docSnap = await getDoc(docRef);
                setIsAdmin(docSnap.exists() ? docSnap.data().isAdmin : false);
            } else {
                setIsAdmin(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success w-100 px-3">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold" to="/">Nkwagabon</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"></button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to="/restaurants" className="nav-link">Restaurants</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/events" className="nav-link">Événements</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/places" className="nav-link">Lieux</Link>
                        </li>
                        {isAdmin && (
                            <li className="nav-item">
                                <Link to="/admin" className="nav-link">Admin</Link>
                            </li>
                        )}
                        {user ? (
                            <li className="nav-item">
                                <button className="btn btn-link nav-link" onClick={handleLogout}>Déconnexion</button>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Connexion</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}