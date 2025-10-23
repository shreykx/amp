import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image, Pressable, StyleSheet, View } from "react-native";

interface CustomHeaderProps {
  showMenuIcon?: boolean;
  showBackButton?: boolean;
  onBackPress?: () => void;
  onMenuPress?: () => void;
}

export default function CustomHeader({ showMenuIcon = false, showBackButton = false, onBackPress, onMenuPress }: CustomHeaderProps) {
  return <View style={[styles.container, { borderBottomWidth: 1, borderBottomColor: '#e0e0e0' }]}>
    {showBackButton ? (
      <Pressable style={styles.backButton} onPress={onBackPress}>
        <MaterialCommunityIcons name="chevron-left" size={54} color="#333" />
      </Pressable>
    ) : (
      <View style={styles.leftSpace} />
    )}
    <Image
      source={require('../../assets/images/amp-transparent.png')}
      style={styles.logo}
      resizeMode="contain"
    />
    {showMenuIcon ? (
      <Pressable style={styles.menuButton} onPress={onMenuPress}>
        <Ionicons name="ellipsis-horizontal-circle-outline" size={34} color="#333" />
      </Pressable>
    ) : (
      <View style={styles.menuButton} />
    )}
  </View>;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  leftSpace: {
    width: 40, // Same width as menu button to center the logo
  },
  backButton: {
    padding: 0,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 60,
  },
  menuButton: {
    padding: 0,
    width: 40,
    alignItems: 'center',
  },
});