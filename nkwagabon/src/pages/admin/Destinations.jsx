import React, { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebaseConfig';

export default function Destinations() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({ nom: '', description: '', localisation: '', image: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
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


  const apiBase = 'http://localhost:3000/places'; 

  const fetchPlaces = async () => {
    try {
      const response = await fetch(apiBase);
      const data = await response.json();
      setPlaces(data);
    } catch (err) {
      setError('Erreur lors du chargement des destinations.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce lieu ?')) return;
    await fetch(`${apiBase}/${id}`, { method: 'DELETE' });
    fetchPlaces();
  };

  const handleEdit = (place) => {
    setFormData({
      nom: place.name,
      description: place.description,
      localisation: place.adress,
      image: place.photo,
    });
    setEditId(place.id);
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `${apiBase}/${editId}` : apiBase;

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      alert('Erreur lors de l’envoi du formulaire');
      return;
    }

    setFormData({ nom: '', description: '', localisation: '', image: '' });
    setIsEditing(false);
    setEditId(null);
    fetchPlaces();
  };

  if (loading) return <p>Chargement des destinations...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container">
      <h2 className="mb-4">📍 Destinations</h2>

      {/* Formulaire ajout/modif */}
      <form onSubmit={handleSubmit} className="mb-4 border rounded p-3 bg-light shadow-sm">
        <h5>{isEditing ? 'Modifier un lieu' : 'Ajouter un lieu'}</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Nom"
              className="form-control"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Localisation"
              className="form-control"
              value={formData.localisation}
              onChange={(e) => setFormData({ ...formData, localisation: e.target.value })}
              required
            />
          </div>
          <div className="col-12">
            <textarea
              placeholder="Description"
              className="form-control"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          <div className="col-12">
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
              {isEditing ? 'Mettre à jour' : 'Ajouter'}
            </button>
          </div>
        </div>
      </form>

      {/* Tableau des lieux */}
      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-success">
            <tr>
              <th>Nom</th>
              <th>Localisation</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {places.map((place) => (
              <tr key={place.id}>
                <td>{place.name}</td>
                <td>{place.adress}</td>
                <td>{place.description}</td>
                <td>
                  <img src={place.photo} alt={place.name} style={{ width: '80px', height: '60px', objectFit: 'cover' }} />
                </td>
                <td>
                  <button onClick={() => handleEdit(place)} className="btn btn-sm btn-warning me-2">Modifier</button>
                  <button onClick={() => handleDelete(place.id)} className="btn btn-sm btn-danger">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
