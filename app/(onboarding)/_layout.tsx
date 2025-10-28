import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, View, Text } from "react-native";
import CustomHeader from "../components/CustomHeader";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useOnBoarding } from "../contexts/OnBoardingContext";
export default function OnBoardingLayout() {
    const { step, prevStep } = useOnBoarding()
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <CustomHeader showMenuIcon={false} showBackButton={step > 0} onBackPress={prevStep} />
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="flow" />
                </Stack>
                <StatusBar style="dark" />
            </View>
        </SafeAreaView>
    )
}