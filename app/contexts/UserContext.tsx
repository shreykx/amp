import { createContext, useState, useEffect, useContext, ReactNode, Dispatch, SetStateAction } from "react";
import { getUserData } from "@/utils/funcs/User";
import { supabase } from "@/utils/supabase";

// Define the type for user, you may want to replace 'any' with a more specific type if known
type UserType = any | null;

interface UserContextType {
    user: UserType;
    setUser: Dispatch<SetStateAction<UserType>>;
}

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => { },
});

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserType>(null);

    useEffect(() => {
        const fetchUser = async (userId?: string) => {
            if (!userId) {
                setUser(null);
                return;
            }
            const userData = await getUserData();
            console.log("Fetched user data:", userData?.data);
            setUser(userData?.data ?? null);
        };
        const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
            fetchUser(session?.user?.id);
        });
        return () => subscription.subscription.unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}