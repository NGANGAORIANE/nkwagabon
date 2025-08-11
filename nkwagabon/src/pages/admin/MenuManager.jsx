import React, { useEffect, useState } from 'react';

export default function MenuManager({ restaurantId }) {
  const [menus, setMenus] = useState([]);
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    prix: '',
    photo: '',
  });

  const [editingId, setEditingId] = useState(null);
  const apiBase = 'http://localhost:3000/menus';

  const fetchMenus = async () => {
    const res = await fetch(`${apiBase}/${restaurantId}`);
    const data = await res.json();
    setMenus(data);
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleSubmitMenu = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${apiBase}/${editingId}` : apiBase;

    const body = {
      ...formData,
      restaurant_id: restaurantId,
    };

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      fetchMenus();
      setFormData({ nom: '', description: '', prix: '', photo: '' });
      setEditingId(null);
    }
  };

  const handleEditMenu = (menu) => {
    setFormData({
      nom: menu.nom,
      description: menu.description,
      prix: menu.prix,
      photo: menu.photo,
    });
    setEditingId(menu.id);
  };

  const handleDeleteMenu = async (id) => {
    if (!window.confirm('Supprimer ce menu ?')) return;
    await fetch(`${apiBase}/${id}`, { method: 'DELETE' });
    fetchMenus();
  };

  return (
    <div className="p-3 border bg-white rounded">
      <h6>Menus</h6>
      <form onSubmit={handleSubmitMenu} className="row g-2 mb-3">
        <div className="col-md-3">
          <input
            type="text"
            placeholder="Nom"
            value={formData.nom}
            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            placeholder="Prix"
            value={formData.prix}
            onChange={(e) => setFormData({ ...formData, prix: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="url"
            placeholder="Image URL"
            value={formData.photo}
            onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
            className="form-control"
          />
        </div>
        <div className="col-md-1">
          <button type="submit" className="btn btn-success w-100">
            {editingId ? 'Modifier' : 'Ajouter'}
          </button>
        </div>
      </form>

      <ul className="list-group">
        {menus.map((m) => (
          <li key={m.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{m.nom}</strong> – {m.description} – {m.prix}FCFA
              {m.photo && (
                <img src={m.photo} alt="menu" className="ms-3" style={{ height: '40px' }} />
              )}
            </div>
            <div>
              <button onClick={() => handleEditMenu(m)} className="btn btn-sm btn-warning me-2">
                ✏️
              </button>
              <button onClick={() => handleDeleteMenu(m.id)} className="btn btn-sm btn-danger">
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
