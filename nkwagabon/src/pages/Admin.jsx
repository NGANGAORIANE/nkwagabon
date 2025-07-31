import React, { useState } from 'react';
import Header from '../components/Header'; // Ton header vert avec logo et profil
import Sidebar from '../components/Sidebar'; // Le menu latéral
import TableauDeBord from './admin/Dashboard';
import Utilisateurs from './admin/Users';
import Destinations from './admin/Destinations';
import Restaurants from './admin/Restaurants';
import Evenements from './admin/Events';
import { auth,db } from '../firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const [activeMenu, setActiveMenu] = useState('tableauDeBord');
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

  if (isAdmin === null) {
    return <div>Chargement...</div>;
  }
  if (!isAdmin) {
    return null; 
  }

  const renderContent = () => {
    switch (activeMenu) {
      case 'tableauDeBord':
        return <TableauDeBord />;
      case 'utilisateurs':
        return <Utilisateurs />;
      case 'destinations':
        return <Destinations />;
      case 'restaurants':
        return <Restaurants />;
      case 'evenements':
        return <Evenements />;
      default:
        return <TableauDeBord />;
    }
  };

  return (
    <>
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      
      <div style={{ marginLeft: '240px', paddingTop: '72px' }}>
        <Header style={{marginTop: '72px'}} />
        <main className="p-4 bg-light" style={{ minHeight: '100vh'}}>
          {renderContent()}
        </main>
      </div>
    </>
  );
}

