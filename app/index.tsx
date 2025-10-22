import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "./components/CustomHeader";
import AuthenticationPage from "./pages/AuthenticationPage";

export default function Index() {
  const [authState, setAuthState] = useState(true)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader />
      <View style={{ flex: 1 }}>
        {authState && <AuthenticationPage />}
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}