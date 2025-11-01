import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { StatusBar } from "expo-status-bar";
import { getQuestions } from '@/utils/funcs/User';
import { events } from '@/modules/Events';

type Question = {
  id: string;
  questionText: string;
  summary: string | null;
  numberOfResponses: number;
  totalLikes: number;
  totalDislikes: number;
  authorHandle: string;
};

export default function HomePage() {
  // This is where your main app content will go
  // For now, it's just a placeholder
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // Handling animations
  const translateY = useSharedValue(50)
  const opacity = useSharedValue(0)
  const animatedQuestionCardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value
  }))
  const fetchQuestions = async () => {
    setIsLoading(true);
    const { data, error, status } = await getQuestions();
    if (error || !data) {
      console.error(error);
      setIsLoading(false);
      return;
    }
    const formatted = data.map((q: any) => ({
      id: q.id.toString(),
      questionText: q.question_text,
      summary: q.question_summary,
      numberOfResponses: q.question_impressions,
      totalLikes: q.question_likes,
      totalDislikes: q.question_dislikes,
      authorHandle: q.question_author_uid,
    }));
    setQuestions(formatted);

    setIsLoading(false);

    translateY.value = withTiming(0, { duration: 300 });
    opacity.value = withTiming(1, { duration: 300 });
  };

  useEffect(() => {
    fetchQuestions();
  }, []);
  useEffect(() => {
    const sub = events.addListener('refreshQuestions', fetchQuestions);
    return () => sub.remove();
  }, []);
  const renderItem = ({ item }: { item: Question }) => (
    <Animated.View style={[{
      width: '100%',
      borderRadius: 15,
      borderWidth: 1,
      borderColor: '#e0e0e0',
      overflow: 'hidden',
    }, animatedQuestionCardStyle]}>
      <View style={{
        flexDirection: 'row',
        padding: 20
      }}>
        <Text style={{
          fontFamily: 'Poppins_600SemiBold',
          fontSize: 25,
          width: '80%'
        }}>{item.questionText}</Text>
        {/* Example of using Zen Dots font:
        <Text style={{
          ,
          fontSize: 20,
          color: '#F75270'
        }}>Zen Dots Text</Text>
        */}
        <Pressable style={{
          // backgroundColor : 'black',
          width: '20%',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Feather name="share-2" size={32} color="black" />
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
              fontFamily: 'Poppins_600SemiBold',
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
    </Animated.View>
  )
  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 7 }}>
      {/* User Info Section */}


      {/* Main (home) screen */}
      {isLoading ? (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ActivityIndicator size="large" color="#F75270" />
        </View>
      ) : (
        <FlatList
          data={questions}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          contentContainerStyle={{ paddingVertical: 10 }}
        />
      )}
      <StatusBar style="dark" />
    </View>
  );
}
