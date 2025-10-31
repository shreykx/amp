import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, Text, TextInput, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from './components/CustomHeader';
import { useAuth } from './contexts/AuthContext';
import { useUser } from './contexts/UserContext';


export default function AccountPage() {
  const { user, logout } = useAuth()
  const { profile } = useUser()
  const avatarUrl = user?.user_metadata?.avatar_url;
  const router = useRouter();
  const [isBuyModalVisible, setIsBuyModalVisible] = useState(true);
  const [summariesQuantity, setSummariesQuantity] = useState(0);
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
        onPress={() => {
          setIsBuyModalVisible(true);
        }}
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
      {isBuyModalVisible && (
        <Pressable
          onPress={() => setIsBuyModalVisible(false)}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.2)',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'flex-end',
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <ScrollView
              keyboardShouldPersistTaps="handled"
            >

              <View style={{
                paddingVertical: 20,
                backgroundColor: "white",
                flexDirection: "column",
                gap: 16,
              }}>
                <View style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 5,
                  paddingHorizontal: 20,
                }}>
                  <Text style={{
                    fontFamily: 'Poppins_600SemiBold',
                    fontSize: 31,
                    includeFontPadding: false
                  }}>Buy Summaries</Text>
                  <Pressable onPress={() => {
                    setIsBuyModalVisible(false);
                  }}>
                    <Feather name="x" size={24} color="#1C1B1F" />
                  </Pressable>
                </View>
                <View style={{
                  paddingHorizontal: 20,
                  gap: 40,
                  paddingBottom: 20,
                }}>
                  <Text style={{
                    fontFamily: 'Poppins_400Regular',
                    fontSize: 12,
                    includeFontPadding: false,
                    color: "#1C1B1F",
                  }}>You can use these summaries on any question you create. The free summary will always remain as it is.</Text>
                  <TextInput
                    value={summariesQuantity === 0 ? '' : summariesQuantity.toString()}
                    keyboardType="numeric"
                    maxLength={5}
                    onChangeText={(text) => {
                      // Only allow numbers and empty string
                      if (text === '') {
                        setSummariesQuantity(0);
                        return;
                      }

                      if (!/^\d+$/.test(text)) return;

                      const numValue = parseInt(text, 10);
                      if (numValue > 10000) return;

                      setSummariesQuantity(numValue);
                    }}
                    placeholderTextColor="#9E9E9E"
                    style={{
                      borderWidth: 1,
                      borderColor: '#000000',
                      borderRadius: 10,
                      padding: 16,
                      fontFamily: 'Poppins_400Regular',
                      fontSize: 24,
                      includeFontPadding: false,
                      color: '#1C1B1F',
                    }}
                    returnKeyType="done"
                  />

                </View>
                <Pressable
                  android_ripple={{
                    color: "white",
                    foreground: true
                  }}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "#F75270",
                    padding: 16,
                  }}>
                  <View style={{
                    flexDirection: "column",
                    gap: 2,
                  }}>
                    <Text style={{
                      fontFamily: "Poppins_600SemiBold",
                      fontSize: 21,
                      includeFontPadding: false,
                      color: "white"
                    }}>Proceed to pay</Text>
                    <Text style={{
                      fontFamily: "Poppins_400Regular",
                      fontSize: 12,
                      includeFontPadding: false,
                      color: "white"
                    }}>All taxes exlcusive</Text>
                  </View>
                  <Text style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 34,
                    includeFontPadding: false,
                    color: "white"
                  }}>${summariesQuantity * 2}</Text>
                </Pressable>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </Pressable>
      )}
    </SafeAreaView>
  );
}
