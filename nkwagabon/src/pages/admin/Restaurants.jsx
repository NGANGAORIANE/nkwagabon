import React, { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebaseConfig';

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
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
    nom: '',
    speciality: '',
    description: '',
    adress: '',
    number: '',
    photo: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const apiBase = 'http://localhost:3000/restaurants'; 

  const fetchRestaurants = async () => {
    try {
      const response = await fetch(apiBase);
      const data = await response.json();
      setRestaurants(data);
    } catch (err) {
      setError('Erreur lors du chargement des restaurants.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce restaurant ?')) return;
    await fetch(`${apiBase}/${id}`, { method: 'DELETE' });
    fetchRestaurants();
  };

  const handleEdit = (restaurant) => {
    setFormData({
      nom: restaurant.nom,
      speciality: restaurant.speciality,
      description: restaurant.description,
      adress: restaurant.adress,
      number: restaurant.number,
      photo: restaurant.photo,
    });
    setEditId(restaurant.id);
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

    setFormData({
      nom: '',
      speciality: '',
      description: '',
      adress: '',
      number: '',
      photo: '',
    });
    setIsEditing(false);
    setEditId(null);
    fetchRestaurants();
  };

  if (loading) return <p>Chargement des restaurants...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container">
      <h2 className="mb-4">🍽️ Restaurants</h2>

      {/* Formulaire ajout/modif */}
      <form onSubmit={handleSubmit} className="mb-4 border rounded p-3 bg-light shadow-sm">
        <h5>{isEditing ? 'Modifier un restaurant' : 'Ajouter un restaurant'}</h5>
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
              placeholder="Spécialité"
              className="form-control"
              value={formData.speciality}
              onChange={(e) => setFormData({ ...formData, speciality: e.target.value })}
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
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Adresse"
              className="form-control"
              value={formData.adress}
              onChange={(e) => setFormData({ ...formData, adress: e.target.value })}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="tel"
              placeholder="Numéro de téléphone"
              className="form-control"
              value={formData.number}
              onChange={(e) => setFormData({ ...formData, number: e.target.value })}
              required
            />
          </div>
          <div className="col-12">
            <input
              type="url"
              placeholder="Image (URL)"
              className="form-control"
              value={formData.photo}
              onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
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

      {/* Tableau des restaurants */}
      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-success">
            <tr>
              <th>Nom</th>
              <th>Spécialité</th>
              <th>Description</th>
              <th>Adresse</th>
              <th>Téléphone</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((r) => (
              <tr key={r.id}>
                <td>{r.nom}</td>
                <td>{r.speciality}</td>
                <td>{r.description}</td>
                <td>{r.adress}</td>
                <td>{r.number}</td>
                <td>
                  <img
                    src={r.photo}
                    alt={r.nom}
                    style={{ width: '80px', height: '60px', objectFit: 'cover' }}
                  />
                </td>
                <td>
                  <button onClick={() => handleEdit(r)} className="btn btn-sm btn-warning me-2">
                    Modifier
                  </button>
                  <button onClick={() => handleDelete(r.id)} className="btn btn-sm btn-danger">
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
