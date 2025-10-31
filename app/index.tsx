import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "./contexts/AuthContext";

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace('/(tabs)' as any);
      } else {        
        router.replace('/(auth)/login' as any);
      }
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#F75270" />
        <StatusBar style="dark" />
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />
    </View>
  );
}