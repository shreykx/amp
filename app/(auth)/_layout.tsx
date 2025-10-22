import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';

export default function AuthLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
      </Stack>
    </SafeAreaView>
  );
}
