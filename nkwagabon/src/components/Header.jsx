import React from 'react';
import { auth } from '../firebaseConfig';

export default function AdminHeader() {
  const user = auth.currentUser;

  return (
    <header className="d-flex justify-content-between align-items-center px-4 py-3 bg-success text-white shadow-sm"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1020
      }}
    >
      <h1 className="h4 m-0">Nkwagabon</h1>

      <div className="d-flex align-items-center gap-3">
        <span className="fw-semibold">Administrateur</span>
        {user && user.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profil"
            className="rounded-circle"
            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
          />
        ) : (
          <div
            className="rounded-circle bg-white text-success d-flex justify-content-center align-items-center"
            style={{ width: '40px', height: '40px', fontWeight: 'bold' }}
          >
            {user?.displayName?.charAt(0).toUpperCase() || 'ADN'}
          </div>
        )}
      </div>
    </header>
  );
}
