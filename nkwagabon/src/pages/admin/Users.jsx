import React, { useEffect, useState } from 'react';
import { collection, getDocs, getDoc,doc } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


export default function Utilisateurs() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        setIsAdmin(docSnap.exists() ? docSnap.data().isAdmin : false);
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe(); 
  }, []);

  useEffect(() => {
    if (isAdmin === false) {
      navigate('/login'); 
    }
  }, [isAdmin, navigate]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'users'));
        const usersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Chargement des utilisateurs...</p>;

  return (
    <div className="container">
      <h2 className="mb-4">👥 Utilisateurs</h2>

      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-success">
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Dernière connexion</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">Aucun utilisateur trouvé</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name || '–'}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.lastLogin?.toDate
                      ? user.lastLogin.toDate().toLocaleString()
                      : 'Non disponible'}
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <span className="badge bg-success">Oui</span>
                    ) : (
                      <span className="badge bg-secondary">Non</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
