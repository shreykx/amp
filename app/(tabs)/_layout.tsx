import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { Tabs, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import CustomTabBar from '../components/CustomTabBar';
import { useUser } from '../contexts/UserContext';

export default function TabLayout() {
  const {user, initialized} = useUser()
  const router = useRouter()

  useEffect(() => {
    if (initialized && (!user || (Array.isArray(user) && user.length === 0))) {
      router.replace("/(onboarding)/flow");
    }
  }, [initialized, user]);

  if (!initialized) return null;
  if (!user || (Array.isArray(user) && user.length === 0)) return null;
  
  
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
