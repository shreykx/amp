import { View, Text, Pressable } from "react-native";
import { useOnBoarding } from "../contexts/OnBoardingContext";

export default function Flow() {
    const { nextStep, buttonText } = useOnBoarding()

    return (<View style={{ flex: 1, backgroundColor: 'white' }}>
        <StepsScreen />
        <View style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            padding: 10,
            width: '100%'
        }}>
            <View style={{
                borderRadius: 500,
                overflow: 'hidden'
            }}>
                <Pressable
                    onPress={nextStep}
                    android_ripple={{
                        foreground: true,
                        color: '#fffff'
                    }}
                    style={{
                        backgroundColor: "#F75270",
                        alignItems: 'center',
                        padding: 20,
                    }}>
                    <Text style={{
                        color: 'white',
                        fontFamily: 'Poppins_700Bold',
                        includeFontPadding: false,
                        fontSize: 25,
                    }}>{buttonText}</Text>
                </Pressable>
            </View>
        </View>
    </View>);
}

function StepsScreen() {
    const { step, userBio, setUserBio, username, setUsername } = useOnBoarding()
    if (step === 0)
        return (<View>
            <Text>First step</Text>
        </View>);
    if (step === 1)
        return (<View>
            <Text>Second step (get Bio)</Text>

        </View>)
    if (step === 2)
        return (<View>
            <Text>Third step (get username)</Text>

        </View>)
}