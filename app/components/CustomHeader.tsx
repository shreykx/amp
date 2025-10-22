import { Image, StyleSheet, View } from "react-native";

export default function CustomHeader() {
  return <View style={[styles.container, { borderBottomWidth: 1, borderBottomColor: '#e0e0e0' }]}>
    <Image 
      source={require('../../assets/images/amp-transparent.png')} 
      style={styles.logo}
      resizeMode="contain"
    />
  </View>;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 60,
  },
});