import { createContext, useState, useEffect, useContext, ReactNode, Dispatch, SetStateAction } from "react";
import { getUserData } from "@/utils/funcs/User";
import { supabase } from "@/utils/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the type for user, you may want to replace 'any' with a more specific type if known
type UserType = any | null;

interface UserContextType {
    user: UserType;
    setUser: Dispatch<SetStateAction<UserType>>;
    initialized : boolean;
    refetchUser: (userId?: string) => Promise<void>;

}

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => { },
    initialized : false,
    refetchUser: async () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserType>(null);
    const [initialized, setInitialized] = useState(false)
    const fetchUser = async (userId?: string) => {
        if (!userId) {
            console.log("No userId, setting user to null");
            
            setUser(null);
            setInitialized(true)
            await AsyncStorage.setItem("hasUser", "false")
            return;
        }
        const userData = await getUserData();
        console.log(userData);
                    
        const data = userData?.data?.[0] ?? null;


        console.log("Fetched user data:", data);
        setUser(data ?? null);
        setInitialized(true)
        await AsyncStorage.setItem("hasUser", data ? "true" : "false")
    };
    useEffect(() => {
        const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
            fetchUser(session?.user?.id);
        });
        return () => subscription.subscription.unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, initialized, refetchUser: fetchUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}