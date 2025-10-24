import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import * as Haptics from 'expo-haptics';
import { Tabs } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import CustomTabBar from '../components/CustomTabBar';
import MenuContainer from '../components/MenuContainer';
import { useAuth } from '../contexts/AuthContext';


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
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  // Menu items configuration
  const menuItems: MenuItem[] = [
    {
      id: 'about',
      title: 'About this app',
      textColor: '#2445C9',
      onPress: () => {
        // Add your about functionality here
        console.log('About pressed');
      },
      showBorder: true,
    },
    {
      id: 'account',
      title: 'Your Account',
      textColor: '#2445C9',
      onPress: () => {
        // Add your account functionality here
        console.log('Account pressed');
      },
      showBorder: true,
    },
    {
      id: 'logout',
      title: 'Logout',
      textColor: '#F75270',
      onPress: handleLogout,
      showBorder: true,
      isCloseButton: false,
    },
    {
      id: 'close',
      title: 'Close',
      textColor: '#F75270',
      onPress: () => {
        // Close menu functionality
        console.log('Close pressed');
      },
      showBorder: false,
      isCloseButton: true,
    },
  ];
  // Handle menu item press
  const handleMenuItemPress = (item: MenuItem) => {
    if (item.isCloseButton) {
      setIsMenuVisible(false);
    }
    
    // Call the item's onPress function if it exists
    if (item.onPress) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      item.onPress();
    }
  };

  // Render menu items dynamically
  const renderMenuItems = () => {
    return menuItems.map((item, index) => (
        <Pressable
          key={item.id}
          style={({ pressed }) => ({
            alignItems: 'center',
            padding: 20,
            borderBottomWidth: item.showBorder ? 1 : 0,
            borderBottomColor: '#e0e0e0',
            backgroundColor: pressed ? '#f2f2f2' : undefined,
            borderTopLeftRadius: index === 0 ? 20 : 0,
            borderTopRightRadius: index === 0 ? 20 : 0,
            borderBottomLeftRadius: index === menuItems.length - 1 ? 20 : 0,
            borderBottomRightRadius: index === menuItems.length - 1 ? 20 : 0,
            overflow: 'hidden',
          })}
          onPress={() => handleMenuItemPress(item)}
        >
        <Text style={{
          color: item.textColor || '#2445C9',
          fontSize: 21,
          fontFamily: "Poppins_400Regular"
        }}>
          {item.title}
        </Text>
      </Pressable>
    ));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <CustomHeader showMenuIcon={true} onMenuPress={() => setIsMenuVisible(!isMenuVisible)} />
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
      <MenuContainer isVisible={isMenuVisible} setIsVisible={setIsMenuVisible}>
        {renderMenuItems()}
      </MenuContainer>
    </SafeAreaView>
  );
}
