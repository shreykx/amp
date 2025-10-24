import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from './components/CustomHeader';
import { Tabs, useRouter } from 'expo-router';

export default function AccountPage() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <CustomHeader showBackButton={true} onBackPress={() => router.back()} showMenuIcon={true}/>
    </SafeAreaView>
  );
}
