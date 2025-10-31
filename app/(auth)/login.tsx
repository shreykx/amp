import React, { useState } from 'react';
import { Alert, Image, Pressable, Text, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
// Google SignIn
import { signInWithGoogle } from '@/utils/supabase';

import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes
} from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
  webClientId: '987212091263-mnd36kt7pi6ie957qd548caj4lk76iml.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
  scopes: [
    /* what APIs you want to access on behalf of the user, default is email and profile
    this is just an example, most likely you don't need this option at all! */
    'https://www.googleapis.com/auth/drive.readonly',
  ],
  profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});


export default function LoginPage() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      
      if (isSuccessResponse(response)) {
        const userData = response.data.user;
        // console.log('Google Sign-In successful:', userData);
        
        const idToken = response.data.idToken;
        
        if (!idToken) {
          throw new Error("No Google ID token returned");
        }
        const user = await signInWithGoogle(idToken)
        
        await signInWithGoogle(idToken)
        login(user)
      } else {
        console.warn("Sign In was cancelled by the user.")
      }

    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            Alert.alert("Sign in is in progress.")
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            Alert.alert("Play services not available.")
            break;
          default:
            console.log("Error", error)
            Alert.alert("Sign in failed", "Please try again.")
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
        console.log("Error", error);
        Alert.alert("An error occurred during sign in.")
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
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
          disabled={isLoading}
          style={{
            paddingVertical: 20,
            paddingHorizontal: 20,
            backgroundColor: isLoading ? "#ccc" : "#F75270",
            width: '95%',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            borderRadius: 100
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
          }}>{isLoading ? "Signing in..." : "Continue with Google"}</Text>
        </Pressable>
      </View>
    </View>
  );
}
