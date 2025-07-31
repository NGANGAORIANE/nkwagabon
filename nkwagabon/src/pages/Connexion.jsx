import React, { useState } from 'react';
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../firebaseConfig.js';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [forgotMode, setForgotMode] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    if (forgotMode) {
      //"mot de passe oublié"
      if (!email) {
        setMessage('Veuillez entrer votre adresse email.');
        return;
      }
      try {
        await sendPasswordResetEmail(auth, email);
        setMessage('Un lien de réinitialisation a été envoyé à votre adresse email.');
      } catch (error) {
        setMessage(`Erreur: ${error.message}`);
      }
      return;
    }

    //"connexion normale"
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        setMessage('Veuillez vérifier votre email avant de vous connecter.');
        return;
      }

      const userDoc = doc(db, 'users', user.uid);
      const userSnapshot = await getDoc(userDoc);

      if (!userSnapshot.exists()) {
        await setDoc(userDoc, {
          name: user.displayName || 'Utilisateur sans nom',
          email: user.email,
          lastLogin: serverTimestamp(),
        });
        setMessage('Bienvenue, nouvel utilisateur !');
      }

      navigate('/compte');
    } catch (error) {
      setMessage(`Erreur: ${error.message}`);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow" style={{ width: '300px' }}>
        <h2 className="text-center mb-4">{forgotMode ? 'Mot de passe oublié' : 'Connexion'}</h2>
        <form onSubmit={handleLogin}>
          {message && <div className="alert alert-info">{message}</div>}

          <input
            type="email"
            placeholder="Email"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {!forgotMode && (
            <input
              type="password"
              placeholder="Mot de passe"
              className="form-control mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}

          <button type="submit" className="btn btn-success w-100 mb-2">
            {forgotMode ? 'Envoyer le lien' : 'Se connecter'}
          </button>
        </form>

        <button
          type="button"
          className="btn btn-link p-0 text-decoration-none"
          onClick={() => {
            setForgotMode(!forgotMode);
            setMessage('');
          }}
        >
          {forgotMode ? '← Revenir à la connexion' : 'Mot de passe oublié ?'}
        </button>
      </div>
    </div>
  );
}
