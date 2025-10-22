import { Pressable, Text, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function InboxPage() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor : 'white' }}>
      <Text style={{ fontSize: 24, fontFamily: 'Poppins_700Bold', marginBottom: 20 }}>
        Inbox
      </Text>
      <Text style={{ fontSize: 16, fontFamily: 'Poppins_400Regular', textAlign: 'center', marginBottom: 30 }}>
        This is your inbox page.
      </Text>
      <Pressable
        onPress={handleLogout}
        style={{
          backgroundColor: '#F75270',
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: 'white', fontFamily: 'Poppins_700Bold' }}>
          Logout
        </Text>
      </Pressable>
    </View>
  );
}
