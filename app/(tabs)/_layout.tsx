import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tabs, useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import CustomTabBar from '../components/CustomTabBar';
import { useUser } from '../contexts/UserContext';

export default function TabLayout() {
  const { user, profile, initialized } = useUser()
  const router = useRouter()
  const redirecting = useRef(false);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!initialized) return;
      
      const hasCompletedOnboarding = await AsyncStorage.getItem("hasUser");
      // console.log('Onboarding status:', { hasCompletedOnboarding, user, profile });
      
      if (user && !profile && hasCompletedOnboarding !== 'true' && !redirecting.current) {
        console.log('Redirecting to onboarding - user exists but no profile');
        redirecting.current = true;
        router.replace("/(onboarding)/flow");
      } else if (!user && !redirecting.current) {
        console.log('No user found, redirecting to auth');
        redirecting.current = true;
        router.replace("/(auth)/login");
      }
    };
    
    checkOnboardingStatus();
  }, [initialized, user, profile]);

  if (!initialized || !user) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={65} color="#F75270" />
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <CustomHeader showMenuIcon={true} />
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#F75270',
            tabBarInactiveTintColor: 'gray',
          }}
          tabBar={(props) => <CustomTabBar {...props} />}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Questions',
              tabBarIcon: ({ color, focused }) => (
                <AntDesign name="question-circle" size={68} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="inbox"
            options={{
              title: 'Inbox',
              tabBarIcon: ({ color, focused }) => (
                <Feather name="inbox" size={68} color={color} />
              ),
            }}
          />
        </Tabs>
    </SafeAreaView>
  );
}
