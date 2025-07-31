import React from 'react';
import { useState } from 'react';
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    updateProfile
} from 'firebase/auth';
import { auth } from '../firebaseConfig.js';
import { useNavigate } from 'react-router-dom';

export default function Inscription() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const registerUser = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(user, { displayName: name });
            setCurrentUser(user);
            await sendEmailVerification(user);
            setMessage('Vérification envoyée à votre email.');
        } catch (error) {
            setMessage(`Erreur: ${error.message}`);
        }
    };
    const handleCheckVerification = async () => {
        if (auth.currentUser) {
            await auth.currentUser.reload();
            if (auth.currentUser.emailVerified) {
                setMessage('Votre email a été vérifié avec succès.');
                navigate("/login")
            } else {
                setMessage('Votre email n\'est pas encore vérifié.');
            }
        }
    };
    const handleResendVerification = async () => {
        if (auth.currentUser) {
            await sendEmailVerification(auth.currentUser);
            setMessage('Email de vérification renvoyé.');
        } else {
            setMessage('Aucun utilisateur connecté.');
        }
    };
    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card p-4 shadow" style={{ width: '300px' }}>
                <h2 className="text-center mb-4">Inscription</h2>
                <form onSubmit={registerUser}>
                    {message && <div className="alert alert-info">{message}</div>}
                    <input type="text" placeholder="Nom" className="form-control mb-3" onChange={(e) => setName(e.target.value)} />
                    <input type="email" placeholder="Email" className="form-control mb-3" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Mot de passe" className="form-control mb-3" onChange={(e) => setPassword(e.target.value)} />
                    <p>Vous avez déjà un compte? <a href="/login">Se connecter</a></p>
                    <button className="btn btn-success w-100">Créer un compte</button>
                </form>
                {currentUser && (
                    <div className="mt-3">
                        <p>Utilisateur connecté: {currentUser.email}</p>
                        <button className="btn btn-primary" onClick={handleCheckVerification}>Vérifier l'email</button>
                        <button className="btn btn-secondary ms-2" onClick={handleResendVerification}>Renvoyer la vérification</button>

                    </div>
                )}
            </div>
        </div>
    );
}