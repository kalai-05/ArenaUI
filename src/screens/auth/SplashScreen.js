import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { colors } from '../../styles/colors';
import ArenaLogo from '../../components/common/ArenaLogo';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.black} />
      <View style={styles.logoContainer}>
        <ArenaLogo size={60} />
        <Text style={styles.logoText}>ARENA</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  logoText: {
    color: '#F0F6FC',
    fontSize: 39,
    fontWeight: '400',
    letterSpacing: -0.59,
  },
});

export default SplashScreen;

