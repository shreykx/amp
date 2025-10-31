import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
export default function AuthLayout() {
  return (
    <SafeAreaView style={{flex : 1, backgroundColor : 'white'}}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <CustomHeader />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" />
        </Stack>
        <StatusBar style="dark" />
      </View>
    </SafeAreaView>
  );
}
