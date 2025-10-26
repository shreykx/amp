import React, { useRef, useEffect, useContext } from 'react';
import { Animated, Pressable } from 'react-native';
import { MenuContext } from '../contexts/MenuContext';

export default function MenuContainer({ children }: { children?: React.ReactNode; isVisible?: boolean; setIsVisible?: (visible: boolean) => void }) {
    // Create an animated value that starts at 0 (hidden)
    const slideAnimation = useRef(new Animated.Value(0)).current;
    const { isMenuVisible, setIsMenuVisible } = useContext(MenuContext);


    useEffect(() => {
        Animated.timing(slideAnimation, {
            toValue: isMenuVisible ? 1 : 0,
            duration: isMenuVisible ? 150 : 250,
            useNativeDriver: true,
        }).start();
    }, [isMenuVisible]);

    return (
        <Pressable
            style={{
                position: 'absolute',
                bottom: 0, left: 0, top: 0, right: 0,
                backgroundColor: "rgba(0,0,0,0.4)",
                width: '100%',
                height: '110%',
                display: isMenuVisible ? 'flex' : 'none',
                padding: 10,
                alignItems: 'center',

            }}
            onPress={() => {
                if (setIsMenuVisible) {
                    setIsMenuVisible(false);
                }
            }}>
            <Animated.View style={{
                position: 'absolute',
                bottom: 120,
                backgroundColor: 'white',
                width: '100%',
                borderRadius: 20,
                overflow: 'hidden',
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