import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from './components/CustomHeader';
import { Tabs, useRouter } from 'expo-router';
import { useAuth } from './contexts/AuthContext';

export default function AccountPage() {
  const { user, logout } = useAuth()
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <CustomHeader showBackButton={true} onBackPress={() => router.back()} showMenuIcon={true} />
      {user && (
        <View style={{
          backgroundColor: '#F8F9FA',
          padding: 15,
          marginBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {user.photo && (
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#F75270',
                marginRight: 10,
                overflow: 'hidden'
              }}>
                <Text style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  lineHeight: 40
                }}>
                  {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <View>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#333'
              }}>
                Welcome, {user.name || user.givenName || 'User'}!
              </Text>
              <Text style={{
                fontSize: 12,
                color: '#666'
              }}>
                {user.email}
              </Text>
            </View>
          </View>
          <Pressable
            onPress={logout}
            style={{
              backgroundColor: '#F75270',
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 15
            }}
          >
            <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
              Logout
            </Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}
