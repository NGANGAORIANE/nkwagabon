import { supabase } from '../supabase.js';

export async function getPlaces(req, res) {
    const { data, error } = await supabase.from('places').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
}

export async function insertPlace(req, res) {
    const { nom, description, localisation, image } = req.body;
    const { data, error } = await supabase
        .from('places')
        .insert([{ name: nom, description, adress: localisation, photo: image }])
        .select();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ message: 'Lieu ajouté', data });
}
