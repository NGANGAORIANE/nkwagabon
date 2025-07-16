import { supabase } from '../supabase.js';

export async function getEvents(req, res) {
    const { data, error } = await supabase.from('events').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
}

export async function insertEvents(req, res) {
    const { titre, date, lieu, image } = req.body;
    const { data, error } = await supabase
        .from('events')
        .insert([{ name: titre, date, adress: lieu, photo: image }])
        .select();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ message: 'Événement ajouté', data });
}