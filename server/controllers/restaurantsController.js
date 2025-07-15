import { supabase } from '../supabase.js';

export async function getRestaurants(req, res) {
    const { data, error } = await supabase.from('restaurants').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
}

export async function insertRestaurant(req, res) {
    const { nom, speciality, description, adress, number, photo } = req.body;
    const { data, error } = await supabase
        .from('restaurants')
        .insert([{ nom, speciality, description, adress, number, photo }])
        .select();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ message: 'Restaurant ajouté', data });
}
