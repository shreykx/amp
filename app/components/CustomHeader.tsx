import { Feather } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

interface CustomHeaderProps {
  showMenuIcon?: boolean;
}

export default function CustomHeader({ showMenuIcon = false }: CustomHeaderProps) {
  return <View style={[styles.container, { borderBottomWidth: 1, borderBottomColor: '#e0e0e0' }]}>
    <View style={styles.leftSpace} />
    <Image 
      source={require('../../assets/images/amp-transparent.png')} 
      style={styles.logo}
      resizeMode="contain"
    />
    {showMenuIcon ? (
      <Pressable style={styles.menuButton}>
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