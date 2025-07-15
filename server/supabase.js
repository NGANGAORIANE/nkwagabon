
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://sumjnepbalkjwfawwvwz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1bWpuZXBiYWxrandmYXd3dnd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MDkxMDEsImV4cCI6MjA2NzM4NTEwMX0.HKZPIp0lvEmqN2PNAD - A6fq9sxfJYfy6bOPuQWgnK1w'
const supabase = createClient(supabaseUrl, supabaseKey)

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