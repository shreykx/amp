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
}

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => { },
    initialized : false,
});

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserType>(null);
    const [initialized, setInitialized] = useState(false)
    useEffect(() => {
        const fetchUser = async (userId?: string) => {
            if (!userId) {
                setUser(null);
                setInitialized(true)
                await AsyncStorage.setItem("hasUser", "false")
                return;
            }
            const userData = await getUserData();
            const data = userData?.data ?? null


            console.log("Fetched user data:", data);
            setUser(data ?? null);
            setInitialized(true)
            await AsyncStorage.setItem("hasUser", data ? "true" : "false")
        };
        const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
            fetchUser(session?.user?.id);
        });
        return () => subscription.subscription.unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, initialized }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}