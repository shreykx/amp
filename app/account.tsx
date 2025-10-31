import { useState } from 'react';
import { Text, View, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from './components/CustomHeader';
import { Tabs, useRouter } from 'expo-router';
import { useAuth } from './contexts/AuthContext';
import { useUser } from './contexts/UserContext';
import Feather from '@expo/vector-icons/Feather';
import MenuContainer from './components/MenuContainer';

export default function AccountPage() {
  const { user, logout } = useAuth()
  const { profile } = useUser()
  const avatarUrl = user?.user_metadata?.avatar_url;
  const router = useRouter();
  const [isBuyModalVisible, setIsBuyModalVisible] = useState(true);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <CustomHeader showBackButton={true} onBackPress={() => router.back()} showMenuIcon={true} />
      <View style={{
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        gap: 20
      }}>
        {avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
            resizeMode="cover"
          />
        ) : (
          <Text>No profile picture</Text>
        )}
        <View style={{
          flexDirection: 'row',
          gap: 5,
          alignItems: 'center'
        }}>
          <Text style={{
            fontFamily: 'Poppins_400Regular',
            fontSize: 16,
            includeFontPadding: false
          }}>@{profile?.username}</Text>
          <Pressable onPress={() => {
            setIsBuyModalVisible(true);
          }}>
            <Feather name="edit-2" size={23} color="black" />
          </Pressable>
        </View>
      </View>
      <View style={{
        padding: 20,
        gap: 9,
      }}>
        <Text style={{
          fontFamily: 'Poppins_600SemiBold',
          fontSize: 21,
          includeFontPadding: false
        }}>Display Name</Text>
        <Text style={{
          fontSize: 18,
          fontFamily: 'Poppins_400Regular',
          includeFontPadding: false
        }}>{profile?.display_name}</Text>
      </View>
      <View style={{
        padding: 20,
        gap: 9,
      }}>
        <Text style={{
          fontFamily: 'Poppins_600SemiBold',
          fontSize: 21,
          includeFontPadding: false
        }}>Bio</Text>
        <Text style={{
          fontSize: 18,
          fontFamily: 'Poppins_400Regular',
          includeFontPadding: false
        }}>{profile?.bio}</Text>
      </View>
      <Pressable
        android_ripple={{
          foreground: true,
          color: '#F75270',
        }}
        style={{
          padding: 20,
          alignItems: 'center',
          borderColor: '#D9D9D9',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 2
        }}>
        <Text style={{
          fontFamily: 'Poppins_600SemiBold',
          fontSize: 21,
          includeFontPadding: false,
          color: '#2445C9'
        }}>Buy Summaries</Text>
        <Feather name="chevron-right" size={24} color="#2445C9" />
      </Pressable>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        padding: 30
      }}>
        <Feather name="info" size={24} color="#5D5D5D" />
        <Text style={{
          fontFamily: 'Poppins_400Regular',
          fontSize: 12,
          includeFontPadding: false,
          color: '#5D5D5D'
        }}>You get 1 free summary per question. Click above to get
          more summaries!</Text>
      </View>
      <MenuContainer isVisible={isBuyModalVisible}>
        <Text>Hello Universe!</Text>
      </MenuContainer>
    </SafeAreaView>
  );
}
