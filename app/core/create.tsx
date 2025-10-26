import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, TextInput, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import CustomHeader from '../components/CustomHeader';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Create() {
    const router = useRouter();
    const [inputText, setInputText] = useState('');
    const [isCreateButtonLoading, setIsCreateButtonLoading] = useState<boolean>(false)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <CustomHeader showBackButton={true} onBackPress={() => router.back()} showMenuIcon={true} />
            <View style={{
                padding: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#eee',
            }}>
                <Text style={{
                    fontFamily: 'Poppins_400Regular',
                    fontSize: 17,
                    color: "#2445C9"
                }}>@shreykx Asks</Text>
                <TextInput
                    value={inputText}
                    onChangeText={(text) => {
                        if (text.length <= 100) setInputText(text);
                    }}
                    maxLength={100}
                    placeholder="What would you like to ask?"
                    placeholderTextColor="#999"
                    multiline={true}
                    style={{
                        fontSize: 23,
                        fontFamily: 'Poppins_600SemiBold',
                        borderRadius: 8,
                        paddingTop: 9,
                        minHeight: 27,
                        width: '100%'
                    }}
                />
            </View>
            <View style={{
                position: 'absolute',
                bottom: 0,
                padding: 20,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
            }}>
                <Pressable
                    onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
                        setIsCreateButtonLoading(true)
                        if (!inputText.trim()) {
                            Alert.alert("Please enter a question before creating.");
                            setIsCreateButtonLoading(false)
                            return;
                        }
                    }}
                    android_ripple={{
                        foreground: true,
                        color: '#fffff'
                    }}
                    style={[
                        {
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            width: '77%',
                            backgroundColor: "#F75270",
                            borderRadius: 100,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            height : '100%'
                        },
                        isCreateButtonLoading && { opacity: 0.5 }
                    ]}
                >
                    {isCreateButtonLoading ? (
                        <ActivityIndicator size={65} color={"white"} style={{
                            position : 'absolute',
                            alignSelf: 'center'
                        }} />
                    ) : (
                        <>
                            <Text style={{
                                color: 'white',
                                fontSize: 30,
                                fontFamily: 'Poppins_700Bold',
                                includeFontPadding: false,
                            }}>Create</Text>
                            <Text style={{
                                color: 'white'
                            }}>
                                <Text style={{
                                    fontFamily: 'Poppins_400Regular',
                                }}>Powered by</Text>
                                <Text style={{
                                    fontFamily: 'ZenDots_400Regular'
                                }}> amp</Text>
                            </Text>
                        </>
                    )}
                </Pressable>
                <View style={{
                    width: '23%',
                    overflow: 'hidden',
                    borderRadius: 100
                }}>
                    <Pressable
                        android_ripple={{
                            foreground: true,
                            color: '#f8d7da'
                        }}
                        onPress={() => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
                            router.back()
                        }}
                        style={{
                            aspectRatio: 1,
                            borderRadius: 100,
                            width: '100%',
                            borderWidth: 2,
                            borderColor: '#F75270',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'white',
                        }}
                    >
                        <MaterialIcons name="delete-outline" size={38} color="#F75270" />
                    </Pressable>
                </View>

            </View>
        </SafeAreaView>
    )
}