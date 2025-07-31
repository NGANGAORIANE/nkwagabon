import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { getDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [visits, setVisits] = useState([]);
  const [stats, setStats] = useState({ total: 0, uniques: 0 });
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
    const fetchVisits = async () => {
      const snapshot = await getDocs(collection(db, 'visits'));
      const rawData = snapshot.docs.map(doc => doc.data());

      // Statistiques globales
      const total = rawData.length;
      const uniques = new Set(rawData.map(v => v.userId || 'anonyme')).size;

      // Visites par date
      const grouped = {};
      rawData.forEach(visit => {
        const date = new Date(visit.timestamp?.toDate()).toLocaleDateString();
        grouped[date] = (grouped[date] || 0) + 1;
      });

      const visitsByDate = Object.entries(grouped).map(([date, count]) => ({
        date,
        count,
      }));

      setStats({ total, uniques });
      setVisits(visitsByDate);
    };

    fetchVisits();
  }, []);

  return (
    <div className="container">
      <h2 className="mb-4">📊 Tableau de bord</h2>

      <div className="row mb-4 ">
        <div className="col-md-4">
          <div className="bg-success text-white p-3 rounded shadow-sm">
            <h4 className="m-0">Visites totales</h4>
            <p className="fs-3 fw-bold">{stats.total}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="bg-secondary text-white p-3 rounded shadow-sm">
            <h4 className="m-0">Utilisateurs uniques</h4>
            <p className="fs-3 fw-bold">{stats.uniques}</p>
          </div>
        </div>
      </div>

      <h5 className="mb-3">Évolution des visites</h5>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={visits}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#28a745" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
  
}
