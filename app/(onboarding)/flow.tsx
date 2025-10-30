import { useEffect } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import * as Haptics from 'expo-haptics';
import { useOnBoarding } from "../contexts/OnBoardingContext";
import { ActivityIndicator } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";

export default function Flow() {
    const { nextStep, buttonText, isActionButtonLoading } = useOnBoarding()

    return (<View style={{ flex: 1, backgroundColor: 'white' }}>
        <AnimatedStepsScreen />
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
                    disabled={isActionButtonLoading}
                    onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
                        nextStep();
                    }}
                    android_ripple={{
                        foreground: true,
                        color: '#fffff'
                    }}
                    style={{
                        backgroundColor: "#F75270",
                        alignItems: 'center',
                        padding: isActionButtonLoading ? 10 : 20,
                        opacity: isActionButtonLoading ? 0.5 : 1,
                    }}>

                    {isActionButtonLoading ? (
                        <ActivityIndicator size={55} color="white" />
                    ) : (
                        <Text style={{
                            color: 'white',
                            fontFamily: 'Poppins_700Bold',
                            includeFontPadding: false,
                            fontSize: 25,
                        }}>{buttonText}</Text>
                    )}
                </Pressable>
            </View>
        </View>
    </View>);
}

function AnimatedStepsScreen() {
    const { step } = useOnBoarding();
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(30);

    const style = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));

    useEffect(() => {
        opacity.value = 0;
        translateY.value = 30;
        opacity.value = withTiming(1, { duration: 250 });
        translateY.value = withTiming(0, { duration: 250 });
    }, [step]);

    return (
        <Animated.View style={[{ flex: 1 }, style]}>
            <StepsScreen />
        </Animated.View>
    );
}

function StepsScreen() {
    const { step, userBio, setUserBio, username, setUsername, totalSteps, isActionButtonLoading } = useOnBoarding()

    if (step === 0)
        return (<View style={{
            padding: 10,
            gap: 30,
        }}>
            <View style={{
                gap: 3,
            }}>
                <View style={{
                    flexDirection: 'row',
                    position: 'relative'
                }}>
                    <Text style={{
                        fontSize: 18,
                        fontFamily: 'Poppins_600SemiBold'
                    }}>Welcome to Amp!</Text>

                    <Text style={{
                        fontSize: 18,
                        fontFamily: 'Poppins_600SemiBold',
                        position: 'absolute',
                        right: 4,
                        color: "#F75270"
                    }}>{step}/{totalSteps}</Text>

                </View>
                <Text style={{
                    fontSize: 13,
                    fontFamily: 'Poppins_400Regular',
                    color: "#1C1B1F"
                }}>Just a little tour and we'd be good to go!</Text>
            </View>
        </View>);
    if (step === 1)
        return (<View style={{
            padding: 10,
            gap: 30,
        }}>
            <View style={{
                gap: 3,
            }}>
                <View style={{
                    flexDirection: 'row',
                    position: 'relative'
                }}>
                    <Text style={{
                        fontSize: 18,
                        fontFamily: 'Poppins_600SemiBold'
                    }}>Introduce yourself...</Text>

                    <Text style={{
                        fontSize: 18,
                        fontFamily: 'Poppins_600SemiBold',
                        position: 'absolute',
                        right: 4,
                        color: "#F75270"
                    }}>{step}/{totalSteps}</Text>

                </View>
                <Text style={{
                    fontSize: 13,
                    fontFamily: 'Poppins_400Regular',
                    color: "#1C1B1F"
                }}>Write a bit of about yourself. Could be a simple thing!</Text>
            </View>
            <TextInput
                placeholder="Just a guy."
                placeholderTextColor="#888"
                multiline
                maxLength={150}
                textAlignVertical="top"
                numberOfLines={30}
                style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 20,
                    color: "black",
                    height: 200,
                    fontSize: 18,
                    fontFamily: 'Poppins_400Regular',
                    includeFontPadding: false
                }}
                value={userBio}
                onChangeText={setUserBio}
            />
        </View>)
    if (step === 2)
        return (<View style={{
            padding: 10,
            gap: 30,
        }}>
            <View style={{
                gap: 3,
            }}>
                <View style={{
                    flexDirection: 'row',
                    position: 'relative'
                }}>
                    <Text style={{
                        fontSize: 18,
                        fontFamily: 'Poppins_600SemiBold'
                    }}>Choose a username</Text>

                    <Text style={{
                        fontSize: 18,
                        fontFamily: 'Poppins_600SemiBold',
                        position: 'absolute',
                        right: 4,
                        color: "#F75270"
                    }}>{step}/{totalSteps}</Text>

                </View>
                <Text style={{
                    fontSize: 13,
                    fontFamily: 'Poppins_400Regular',
                    color: "#1C1B1F"
                }}>This will be used to identify you across the platform.</Text>
            </View>
            <View style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderRadius: 10,
                alignItems: 'center',
                paddingHorizontal: 14,

            }}>
                <Text style={{
                    fontSize: 23,
                    fontFamily: 'Poppins_700Bold',
                    includeFontPadding: false,
                    marginRight: 6,
                    color: '#F75270',
                    width: 28, // fixed width for the "@" symbol so the input is aligned
                    textAlign: 'center',
                }}>@</Text>
                <TextInput
                    placeholder="your_username"
                    placeholderTextColor="#888"
                    textAlignVertical="top"
                    style={{
                        flex: 1, // fill the remaining space in the row container
                        paddingVertical: 14,
                        paddingHorizontal: 0,
                        color: "black",
                        fontSize: 16,
                        fontFamily: 'Poppins_400Regular',
                        includeFontPadding: false,
                        backgroundColor: 'transparent', // keep background consistent with design
                        minWidth: 0 // ensures shrink on smaller screens
                    }}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>
        </View>)
}