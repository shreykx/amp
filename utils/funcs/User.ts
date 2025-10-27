import { supabase } from '../supabase';

export async function getUserData() {
    const { data, error, status } = await supabase
        .from("users")
        .select("*");
    
    return { data, error, status };
}