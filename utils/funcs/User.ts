import { supabase } from '../supabase';

export async function getUserData() {
    // const { data, error, status } = await supabase
    //     .from("users")
    //     .select("*"); --removed for testing
    
    return { data : [], error : null, status : 200 };
}