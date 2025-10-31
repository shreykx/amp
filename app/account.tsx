import React from 'react';
import { Text, View, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from './components/CustomHeader';
import { Tabs, useRouter } from 'expo-router';
import { useAuth } from './contexts/AuthContext';
import { useUser } from './contexts/UserContext';
import Feather from '@expo/vector-icons/Feather';

export default function AccountPage() {
  const { user, logout } = useAuth()
  const { profile } = useUser()
  const avatarUrl = user?.user_metadata?.avatar_url;
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <CustomHeader showBackButton={true} onBackPress={() => router.back()} showMenuIcon={true} />
      <View style={{
        flexDirection: 'column',
        alignItems : 'center',
        padding : 20,
        gap : 20
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
          flexDirection : 'row',
          gap : 5,
          alignItems : 'center'
        }}>
          <Text style={{
            fontFamily : 'Poppins_400Regular',
            fontSize : 16,
            includeFontPadding : false
          }}>@{profile?.username}</Text>
          <Pressable onPress={() => {

          }}>
          <Feather name="edit-2" size={23} color="black" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
