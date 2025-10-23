import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';

export default function HomePage() {
  // This is where your main app content will go
  // For now, it's just a placeholder
  const [questions, setQuestions] = useState([
    {
      id: '0',
      questionText: "What’s the best place to visit this summer?",
      summary: null,
      numberOfResponses: 12,
      totalLikes: 2,
      totalDislikes: 4,
      authorHandle: 'shreykx',
    },
    {
      id: '1',
      questionText: "Should I propose her?",
      summary: "Most people who responded think you should go for her—the overall consensus is very positive. Several commenters say you seem like a great match and encourage you to be confident and express your feelings. Some suggest considering what you know about her feelings, but overall, the advice is to take the leap and propose!",
      numberOfResponses: 17,
      totalLikes: 15,
      totalDislikes: 2,
      authorHandle: 'shreykx',
    }
  ])
  const renderItem = ({ item }: { item: typeof questions[0] }) => (
    <View style={{
      width: '100%',
    }}>
      <View style={{
        flexDirection: 'row',
        padding: 20
      }}>
        <Text style={{
          fontFamily: 'Poppins_600SemiBold',
          fontSize: 25,
          width: '80%'
        }}>{item.questionText}</Text>
        <Pressable style={{
          // backgroundColor : 'black',
          width: '20%',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <MaterialCommunityIcons name="share-outline" size={52} color="black" />
        </Pressable>
      </View>
      <View style={{
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingBottom: 20,
        gap: 18,
      }}>
        {/** Icons and labels */}
        {/* Total number of responses */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
          minHeight: 26,
        }}>
          <Text style={{
            fontSize: 21,
            lineHeight: 26,
            includeFontPadding: false,
            fontFamily: 'Poppins_400Regular',
          }}>{item.numberOfResponses}</Text>
          <MaterialCommunityIcons name="account-group-outline" size={26} color="black" />
        </View>
        {/* Total likes */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
          minHeight: 26,
        }}>
          <Text style={{
            fontSize: 21,
            fontFamily: 'Poppins_400Regular',
            lineHeight: 26,
            textAlignVertical: 'center',
            includeFontPadding: false,
            paddingTop: 2,
          }}>
            {item.totalLikes}
          </Text>
          <Feather name="thumbs-up" size={26} color="black" />
        </View>
        {/* Total Dislikes */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
          minHeight: 26,
        }}>
          <Text style={{
            fontSize: 21,
            fontFamily: 'Poppins_400Regular',
            lineHeight: 26,
            textAlignVertical: 'center',
            includeFontPadding: false,
            paddingTop: 2,
          }}>
            {item.totalDislikes}
          </Text>
          <Feather name="thumbs-down" size={26} color="black" />
        </View>
      </View>
      {item.summary == null ? (
        <Pressable
          android_ripple={{
            foreground: true,
            color: '#fffff'
          }}

          style={{
            width: '100%',
            padding: 20,
            backgroundColor: '#F75270',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{
            color: 'white',
            fontSize: 24,
            fontFamily: "Poppins_600SemiBold",
            lineHeight: 24,
            includeFontPadding: false,
          }}>Summarize</Text>
          <Feather name="chevron-right" size={24} color="white" />
        </Pressable>
      ) : (
        <View>
          <View style={{
            width: '100%',
            padding: 20,
            backgroundColor: '#F8F9FA',
          }}>
            <Text style={{
              fontSize: 24,
              fontFamily: 'Poppins_400Regular',
              lineHeight: 27,
              color: '#F75270',
            }}>{item.summary}</Text>
          </View>
          <Pressable
            android_ripple={{
              foreground: true,
              color: '#FBEAF1'
            }}
            style={{
              width: '100%',
              padding: 20,
              backgroundColor: '#EEEEEE',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{
              color: '#F75270',
              fontSize: 24,
              fontFamily: "Poppins_600SemiBold",
              lineHeight: 24,
              includeFontPadding: false,
            }}>Resummarize</Text>
            <Feather name="chevron-right" size={24} color="#F75270" />
          </Pressable>
        </View>
      )}
    </View>
  )
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Main (home) screen */}
      <FlatList
        data={questions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}
