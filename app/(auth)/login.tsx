import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();

  const handleGoogleLogin = () => {
    // TODO: Implement Google authentication
    // For now, just call the login function
    login();
  };

  return (
    <View style={{ flex: 1, backgroundColor : 'white' }}>
      {/* content */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        alignContent: 'center',
        paddingHorizontal: 10,
        alignItems: 'center',
      }}>
        <Pressable
          android_ripple={{
            foreground: true,
            color: '#fffff'
          }}
          onPress={handleGoogleLogin}
          style={{
            paddingVertical: 20,
            paddingHorizontal: 20,
            backgroundColor: "#F75270",
            width: '95%',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            borderRadius : 100
          }}>
          <Image
            source={require('../../assets/images/google-icon-white.png')}
            style={{ width: 30, height: 30, marginRight: 10 }}
            resizeMode="contain"
          />
          <Text style={{
            color: 'white',
            fontSize: 21,
            fontFamily: "Poppins_700Bold"
          }}>Continue with Google</Text>
        </Pressable>
      </View>
    </View>
  );
}
