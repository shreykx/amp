import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import CustomHeader from "../components/CustomHeader";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useOnBoarding } from "../contexts/OnBoardingContext";
import * as Haptics from 'expo-haptics';

export default function OnBoardingLayout() {
    const { step, prevStep } = useOnBoarding()
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <CustomHeader
                    showMenuIcon={false}
                    showBackButton={step > 0}
                    onBackPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
                        prevStep();
                    }}
                />
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="flow" />
                </Stack>
                <StatusBar style="dark" />
            </View>
        </SafeAreaView>
    )
}