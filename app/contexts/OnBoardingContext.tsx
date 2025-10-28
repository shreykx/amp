import { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from "react";
import { Alert } from "react-native";

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
});

export function OnBoardingProvider({ children }: { children: ReactNode }) {
    const [step, setStep] = useState(0);
    const [buttonText, setButtonText] = useState("Next");
    const [userBio, setUserBio] = useState("");
    const [username, setUsername] = useState("");

    const totalSteps = 3;

    const handleSubmit = () => {
        console.log(step);

        console.log("Submitting:", { userBio, username });
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
            }}
        >
            {children}
        </OnBoardingContext.Provider>
    );
}

export const useOnBoarding = () => useContext(OnBoardingContext);