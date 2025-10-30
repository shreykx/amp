import { supabase } from '../supabase';
import { getGoogleUserData } from './Session';

export async function getUserData() {
    const { data, error, status } = await supabase
        .from("users")
        .select("*");
    
    return { data, error, status };
}

export async function insertUserData(user: any) {
    const googleData = await getGoogleUserData()
    
    const { data, error, status } = await supabase
        .from("users")
        .insert([{
            bio : user.bio,
            username : user.username,
            email: googleData?.email,
            display_name : googleData?.name
        }])
        .select();
    return { data, error, status };
}