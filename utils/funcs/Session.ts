import { supabase } from "../supabase";

export async function getGoogleUserData() {
    const {data: {session}, error} = await supabase.auth.getSession();
    if (error) throw error;
    if (!session?.user) return null;

    const { user_metadata } = session.user;

    return {
        id: session.user.id,
        email: user_metadata.email,
        name: user_metadata.full_name || user_metadata.name,
        avatar: user_metadata.avatar_url || user_metadata.picture
    }
}