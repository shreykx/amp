import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, View, Text } from "react-native";
import CustomHeader from "../components/CustomHeader";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
export default function OnBoardingLayout() {
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <CustomHeader showMenuIcon={false} />
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="flow" />
                </Stack>
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
                            }}>Next</Text>
                        </Pressable>
                    </View>
                </View>
                <StatusBar style="dark" />

            </View>
        </SafeAreaView>)
}