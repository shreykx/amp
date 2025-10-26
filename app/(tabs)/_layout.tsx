import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import * as Haptics from 'expo-haptics';
import { Tabs, useRouter } from 'expo-router';
import { useContext } from 'react';
import { Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import CustomTabBar from '../components/CustomTabBar';
import MenuContainer from '../components/MenuContainer';
import { useAuth } from '../contexts/AuthContext';
import { MenuProvider, MenuContext } from '../contexts/MenuContext';


// Menu item configuration type
interface MenuItem {
  id: string;
  title: string;
  textColor?: string;
  onPress?: () => void;
  showBorder?: boolean;
  isCloseButton?: boolean;
}

export default function TabLayout() {
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
