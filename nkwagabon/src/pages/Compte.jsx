import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig'; 
import { doc, getDoc } from 'firebase/firestore';

function Compte() {
    const [userData, setUserData] = useState({ email: '', name: '' });

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;

            if (user) {
                const userDocRef = doc(db, 'users', user.uid); 
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const { email, name } = userDoc.data();
                    setUserData({ email, name });
                }
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="container py-5">
            <div className="card shadow p-4 mx-auto" style={{ maxWidth: '600px' }}>
                <h2 className="mb-4">Mon compte</h2>

                <p><strong>Nom :</strong> {userData.name}</p>
                <p><strong>Email :</strong> {userData.email}</p>

                <button className="btn btn-success">Mettre à jour</button>
            </div>
        </div>
    );
}

export default Compte;
