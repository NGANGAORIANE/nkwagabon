
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function insertion(body) {

    const { data, error } = await supabase
        .from('restaurants')
        .insert([
            {
                nom: body.nom,
                description: body.description,
                speciality: body.speciality,
                number: body.number,
                adress: body.adress,
                photo: body.photo
            }
        ])
        .select()
    return (data)
}
export { insertion, supabase };