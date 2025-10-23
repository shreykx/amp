import React, { useRef } from 'react';
import { Animated } from 'react-native';

export default function MenuContainer({ children, isVisible = false }: { children?: React.ReactNode; isVisible?: boolean }) {
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
        <Animated.View style={{
            position: 'absolute',
            bottom: 20,
            // left: '5%', // Center the menu (100% - 90% width = 10%, so 5% on each side)
            backgroundColor: 'white',
            width: '100%',
            borderRadius: 20,
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
    );
}