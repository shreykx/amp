import { useEffect, createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from "react";
import { Alert } from "react-native";
import { insertUserData } from "@/utils/funcs/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useUser } from "./UserContext";
import { getGoogleUserData } from "@/utils/funcs/Session";

interface OnBoardingContextType {
    step: number;
    nextStep: () => void;
    prevStep: () => void;
    buttonText: string;
    setButtonText: Dispatch<SetStateAction<string>>;
    userBio: string;
    setUserBio: Dispatch<SetStateAction<string>>;
    username: string;
    setUsername: Dispatch<SetStateAction<string>>;
    totalSteps: number,
    isActionButtonLoading: boolean,
}

const OnBoardingContext = createContext<OnBoardingContextType>({
    step: 0,
    nextStep: () => { },
    prevStep: () => { },
    buttonText: "",
    setButtonText: () => { },
    userBio: "",
    setUserBio: () => { },
    username: "",
    setUsername: () => { },
    totalSteps: 0,
    isActionButtonLoading: false,
});

export function OnBoardingProvider({ children }: { children: ReactNode }) {
    const [step, setStep] = useState(0);
    const [buttonText, setButtonText] = useState("Next");
    const [userBio, setUserBio] = useState("");
    const [username, setUsername] = useState("");
    const [isActionButtonLoading, setIsActionButtonLoading] = useState(false)
    const router = useRouter()
    const { refetchUser } = useUser()

    const totalSteps = 3;

    const handleSubmit = async () => {
        try {
            setIsActionButtonLoading(true);

            const { data, error, status } = await insertUserData({
                bio: userBio,
                username: username,
            });

            if (error) {
                if (error.code === "23505") {
                    if (error.message.includes("users_username_key")) {
                        Alert.alert("Username already taken", "Please choose another one.");
                    } else if (error.message.includes("users_email_key")) {
                        Alert.alert("Welcome back", "We’ve restored your account.");
                        await AsyncStorage.setItem("hasUser", "true");
                        router.replace("/(tabs)");
                    } else {
                        Alert.alert("Duplicate entry", "Please check your inputs.");
                    }
                } else {
                    console.error("Insert failed:", error);
                    Alert.alert("Error", "Something went wrong while saving your data.");
                }
                return;
            }

            if (status === 201) {
                const googleUserData = await getGoogleUserData();
                await refetchUser(googleUserData?.id);
                await AsyncStorage.setItem("hasUser", "true");
                router.replace("/(tabs)");
            }
        } finally {
            setIsActionButtonLoading(false);
        }
    };

    const nextStep = () => {
        setStep((s) => {
            if (s === 1 && !userBio.trim()) {
                Alert.alert("Missing bio", "Please enter your bio before continuing.");
                return s;
            }

            if (s === 2 && !username.trim()) {
                Alert.alert("Missing username", "Please enter a username.");
                return s;
            }

            if (s < totalSteps - 1) return s + 1;

            handleSubmit();
            return s;
        })
    };

    const prevStep = () => setStep((s) => Math.max(0, s - 1));

    useEffect(() => {
        if (step === totalSteps - 1) setButtonText("Done");
        else if (step === 0) setButtonText("Get Started!");
        else setButtonText("Next");
    }, [step]);

    return (
        <OnBoardingContext.Provider
            value={{
                step,
                nextStep,
                prevStep,
                buttonText,
                setButtonText,
                userBio,
                setUserBio,
                username,
                setUsername,
                totalSteps,
                isActionButtonLoading
            }}
        >
            {children}
        </OnBoardingContext.Provider>
    );
}

export const useOnBoarding = () => useContext(OnBoardingContext);