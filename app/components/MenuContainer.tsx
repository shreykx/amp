import React from 'react';
import { View } from 'react-native';

export default function MenuContainer({ children, isVisible = false }: { children?: React.ReactNode; isVisible?: boolean }) {
    if (!isVisible) return null;
    
    return (
        <View style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        }}>
            <View style={{
                position : 'absolute',
                bottom : 20,
                backgroundColor : 'white',
                width : '90%',
                borderRadius : 20,
            }}>
            {children}
            </View>
        </View>
    );
}