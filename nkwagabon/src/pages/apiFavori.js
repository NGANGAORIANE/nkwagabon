// apiFavori.js
export async function fetchFavoris(userId) {
  const response = await fetch(`http://localhost:3000/favoris/${userId}`);
  if (!response.ok) throw new Error("Erreur lors du chargement des favoris");
  return await response.json();
}

export async function addFavori({ user_id, element_id, type }) {
  const response = await fetch(`http://localhost:3000/favoris`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, element_id, type })
  });
  if (!response.ok) throw new Error("Erreur lors de l’ajout aux favoris");
  return await response.json();
}

export async function removeFavori({ user_id, element_id, type }) {
  const response = await fetch(`http://localhost:3000/favoris`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, element_id, type })
  });
  if (!response.ok) throw new Error("Erreur lors de la suppression des favoris");
  return await response.json();
}
