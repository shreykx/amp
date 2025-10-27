import { createClient, User } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const supabase = createClient(
    process.env.EXPO_PUBLIC_SUPABASE_URL!,
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
    {
        auth : {
            storage : AsyncStorage,
            persistSession : true,
            autoRefreshToken : true,
            detectSessionInUrl : false
        }   
    }
)


export async function signInWithGoogle(idToken: string): Promise<User> {
    const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: idToken
    })
    if (error || !data.user) {
        throw error ?? new Error("No user returned from Supabase")
    }
    const user = data.user;
    return user;
}

