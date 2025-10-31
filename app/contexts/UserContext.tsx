import { getUserData } from "@/utils/funcs/User";
import { supabase } from "@/utils/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

// Define the type for user, you may want to replace 'any' with a more specific type if known
type UserType = any | null;
type ProfileType = any | null;

interface UserContextType {
    user: UserType;
    profile: ProfileType;
    setUser: Dispatch<SetStateAction<UserType>>;
    initialized: boolean;
    refetchUser: (userId?: string) => Promise<void>;

}

const UserContext = createContext<UserContextType>({
    user: null,
    profile: null,
    setUser: () => { },
    initialized: false,
    refetchUser: async () => { },
});

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserType>(null);
    const [profile, setProfile] = useState<ProfileType>(null);
    const [initialized, setInitialized] = useState(false)
    const fetchUser = async (userId?: string) => {
        try {
            if (!userId) {
                setUser(null);
                setProfile(null);
                setInitialized(true);
                return;
            }
            
            const userData = await getUserData();
            console.log('User data from supabase:', userData);
            
            const data = userData?.data?.[0] ?? null;
            
            // Set both user and profile states
            setUser({ id: userId });
            setProfile(data);
            
            // Only update AsyncStorage if we have valid user data
            if (data) {
                await AsyncStorage.setItem("hasUser", "true");
            } else {
                await AsyncStorage.setItem("hasUser", "false");
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            await AsyncStorage.setItem("hasUser", "false");
        } finally {
            setInitialized(true);
        }
    };
    useEffect(() => {
        const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
            fetchUser(session?.user?.id);
        });
        return () => subscription.subscription.unsubscribe();
    }, []);
    useEffect(() => {
        // console.log("Profile updated:", profile);
    }, [profile]);
    return (
        <UserContext.Provider value={{ user, setUser, initialized, refetchUser: fetchUser, profile }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}