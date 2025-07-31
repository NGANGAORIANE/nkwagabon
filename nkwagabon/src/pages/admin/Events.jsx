import React, { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebaseConfig';


export default function Evenements() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const [formData, setFormData] = useState({
    titre: '',
    date: '',
    lieu: '',
    image: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const apiBase = 'http://localhost:3000/events'; 

  const fetchEvents = async () => {
    try {
      const response = await fetch(apiBase);
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError("Erreur lors du chargement des événements.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet événement ?")) return;
    await fetch(`${apiBase}/${id}`, { method: "DELETE" });
    fetchEvents();
  };

  const handleEdit = (event) => {
    setFormData({
      titre: event.name,
      date: event.date ? event.date.split('T')[0] : '',
      lieu: event.adress,
      image: event.photo,
    });
    setEditId(event.id);
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `${apiBase}/${editId}` : apiBase;

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      alert("Erreur lors de l'envoi du formulaire");
      return;
    }

    setFormData({ titre: "", date: "", lieu: "", image: "" });
    setIsEditing(false);
    setEditId(null);
    fetchEvents();
  };

  if (loading) return <p>Chargement des événements...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container">
      <h2 className="mb-4">📅 Événements</h2>

      <form onSubmit={handleSubmit} className="mb-4 border rounded p-3 bg-light shadow-sm">
        <h5>{isEditing ? "Modifier un événement" : "Ajouter un événement"}</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Titre"
              className="form-control"
              value={formData.titre}
              onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="date"
              className="form-control"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Lieu"
              className="form-control"
              value={formData.lieu}
              onChange={(e) => setFormData({ ...formData, lieu: e.target.value })}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="url"
              placeholder="Image (URL)"
              className="form-control"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              required
            />
          </div>
          <div className="col-12 text-end">
            <button type="submit" className="btn btn-success">
              {isEditing ? "Mettre à jour" : "Ajouter"}
            </button>
          </div>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-success">
            <tr>
              <th>Titre</th>
              <th>Date</th>
              <th>Lieu</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.name}</td>
                <td>{event.date ? new Date(event.date).toLocaleDateString() : ""}</td>
                <td>{event.adress}</td>
                <td>
                  <img
                    src={event.photo}
                    alt={event.name}
                    style={{ width: "80px", height: "60px", objectFit: "cover" }}
                  />
                </td>
                <td>
                  <button onClick={() => handleEdit(event)} className="btn btn-sm btn-warning me-2">
                    Modifier
                  </button>
                  <button onClick={() => handleDelete(event.id)} className="btn btn-sm btn-danger">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
