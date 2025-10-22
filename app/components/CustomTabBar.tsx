import AntDesign from '@expo/vector-icons/AntDesign';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const handleTabPress = (route: any, isFocused: boolean) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      // Different haptic feedback based on platform
      if (Platform.OS === 'ios') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } else {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      }
      
      // Navigate to the tab
      navigation.navigate(route.name);
    } else if (isFocused) {
      // Light feedback even when already focused
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  // Split routes into left and right sides for center button
  const centerIndex = Math.floor(state.routes.length / 2);
  const leftRoutes = state.routes.slice(0, centerIndex);
  const rightRoutes = state.routes.slice(centerIndex);

  const renderTab = (route: any, index: number, isLeftSide: boolean = true) => {
    const { options } = descriptors[route.key];
    const label = typeof options.tabBarLabel === 'string'
      ? options.tabBarLabel
      : options.title !== undefined
      ? options.title
      : route.name;

    // Calculate the actual index in the original routes array
    const actualIndex = isLeftSide ? index : centerIndex + index;
    const isFocused = state.index === actualIndex;
    const color = isFocused ? '#F75270' : 'gray';

    const onPress = () => handleTabPress(route, isFocused);

    return (
      <Pressable
        key={route.key}
        onPress={onPress}
        style={({ pressed }) => ({
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: pressed ? 0.8 : 1,
          transform: [{ scale: pressed ? 0.95 : 1 }],
          overflow: 'hidden',
        })}
        android_ripple={{
          color: '#ff007a1a',
          borderless: false,
          radius: 40,
          foreground: false,
        }}
      >
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 75, // Icon height here
          width: 75, // Icon width here
          borderRadius: 30,
          backgroundColor: 'transparent',
          borderWidth: isFocused ? 1 : 0,
          borderColor: 'transparent',
          shadowColor: 'transparent',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: isFocused ? 3 : 0,
        }}>
          {options.tabBarIcon && options.tabBarIcon({ 
            color, 
            focused: isFocused, 
            size: 28 
          })}
        </View>
        <Text style={{
          fontSize: 11,
          fontWeight: isFocused ? '700' : '600',
          color: color,
          marginTop: 4,
        }}>
          {label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={{
      flexDirection: 'row',
      backgroundColor: 'white',
      height: 115,
      paddingBottom: 5,
      borderTopWidth: 1,
      borderTopColor: '#f0f0f0',
      overflow: 'hidden',
      alignItems: 'flex-end',
      alignContent : 'center',
    }}>
      {/* Left side tabs */}
      <View style={{ flex: 1, flexDirection: 'row', }}>
        {leftRoutes.map((route, index) => renderTab(route, index, true))}
      </View>

      {/* Center button */}
      <Pressable
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
          console.log('Center + pressed');
          // Do something like open modal or navigate
        }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 100,
          backgroundColor: '#F75270',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AntDesign name="plus" size={42} color="white" />
      </Pressable>

      {/* Right side tabs */}
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {rightRoutes.map((route, index) => renderTab(route, index, false))}
      </View>
    </View>
  );
}
