import { Stack } from 'expo-router';
import MenuContainer from '../components/MenuContainer';
import { useContext } from 'react';
import { MenuContext } from '../contexts/MenuContext';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import * as Haptics from 'expo-haptics';
import { Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
interface MenuItem {
    id: string;
    title: string;
    textColor?: string;
    onPress?: () => void;
    showBorder?: boolean;
}

export default function GlobalMenuLayout({ children }: { children: React.ReactNode }) {
    const { isMenuVisible, setIsMenuVisible } = useContext(MenuContext);
    const router = useRouter();
    const { logout } = useAuth();
    const menuItems: MenuItem[] = [
        {
            id: 'about',
            title: 'About this app',
            textColor: '#2445C9',
            onPress: () => {

            },
            showBorder: true,
        },
        {
            id: 'account',
            title: 'Your Account',
            textColor: '#2445C9',
            onPress: () => {
                setIsMenuVisible(false);
                router.push('/account');
            },
            showBorder: true,
        },
        {
            id: 'logout',
            title: 'Logout',
            textColor: '#F75270',
            onPress: () => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                logout();
                setIsMenuVisible(false);
            },
            showBorder: true,
        },
    ];

    const handlePress = (item: MenuItem) => {
        if (item.onPress) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            item.onPress();
        }
    };

    return (
        <>
            {children}
            <MenuContainer isVisible={isMenuVisible} setIsVisible={setIsMenuVisible} >
                {menuItems.map((item, index) => (
                    <Pressable
                        key={item.id}
                        onPress={() => handlePress(item)}
                        style={({ pressed }) => ({
                            alignItems: 'center',
                            padding: 20,
                            borderBottomWidth: item.showBorder ? 1 : 0,
                            borderBottomColor: '#e0e0e0',
                            backgroundColor: pressed ? '#f2f2f2' : undefined,
                            borderTopLeftRadius: index === 0 ? 20 : 0,
                            borderTopRightRadius: index === 0 ? 20 : 0,
                            borderBottomLeftRadius: index === menuItems.length - 1 ? 20 : 0,
                            borderBottomRightRadius: index === menuItems.length - 1 ? 20 : 0,
                            overflow: 'hidden',
                        })}
                    >
                        <Text style={{ color: item.textColor || '#2445C9', fontSize: 21, fontFamily: 'Poppins_400Regular' }}>
                            {item.title}
                        </Text>
                    </Pressable>
                ))}
            </MenuContainer>
        </>
    );
}