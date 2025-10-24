import React, { useRef } from 'react';
import { Animated, Pressable } from 'react-native';

export default function MenuContainer({ children, isVisible = false, setIsVisible }: { children?: React.ReactNode; isVisible?: boolean; setIsVisible?: (visible: boolean) => void }) {
    // Create an animated value that starts at 0 (hidden)
    const slideAnimation = useRef(new Animated.Value(0)).current;

    // Simple animation trigger - no useEffect needed!
    if (isVisible) {
        // Slide up: animate from 0 to 1
        Animated.timing(slideAnimation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    } else {
        // Slide down: animate from 1 to 0
        Animated.timing(slideAnimation, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
        }).start();
    }

    return (
        <Pressable
            style={{
                position : 'absolute',
                bottom : 0, left : 0, top : 0, right : 0,
                backgroundColor : "rgba(0,0,0,0.4)",
                width : '100%',
                height : '110%',
                display: isVisible ? 'flex' : 'none',
                padding : 10,
                alignItems : 'center',

            }}
            onPress={() => {
                if (setIsVisible) {
                    setIsVisible(false);
                }
            }}>
            <Animated.View style={{
                position: 'absolute',
                bottom: 40,
                backgroundColor: 'white',
                width: '100%',
                borderRadius : 20,
                overflow : 'hidden',
                borderWidth: 1,
                borderColor: '#e0e0e0', // Light gray border
                zIndex: 1000,
                // This is the magic! Transform the menu based on animation value
                transform: [{
                    translateY: slideAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [300, 0], // Start 300px below, end at normal position
                    })
                }],
                // Also fade in/out for extra smoothness
                opacity: slideAnimation,
            }}>
                {children}
            </Animated.View>
        </Pressable>
    );
}