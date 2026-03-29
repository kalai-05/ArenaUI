import React, { useEffect, useRef } from 'react';
import { 
  View, Text, StyleSheet, StatusBar, Animated, 
  Dimensions, TouchableOpacity, Easing
} from 'react-native';
import { colors } from '../../styles/colors';
import Header from '../../components/common/Header';
import ArenaLogo from '../../components/common/ArenaLogo';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1117" translucent />
      
      <Header showLogo />

      <Animated.View style={[
        styles.content,
        { 
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}>
        {/* Animated Logo Section */}
        <Animated.View style={[
          styles.logoSection,
          { transform: [{ scale: logoScale }] }
        ]}>
          <ArenaLogo size={240} />
        </Animated.View>

        {/* Text Section with High-Impact Typography */}
        <View style={styles.textSection}>
          <Text style={styles.taglineSmall}>YOUR,</Text>
          <Text style={styles.taglineBig}>GOD'S EYE VIEW</Text>
          <Text style={styles.description}>
            Arena is a cricket data application, that delivers advanced metrics in real-time
          </Text>
        </View>

        {/* Action Buttons Section */}
        <View style={styles.buttonSection}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate('CreateAccount')}
            activeOpacity={0.8}
          >
            <View style={styles.buttonShadow} />
            <View style={styles.buttonContent}>
              <Text style={styles.primaryButtonText}>SIGN UP</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('SignIn')}
            activeOpacity={0.8}
          >
            <View style={styles.buttonShadow} />
            <View style={styles.secondaryButtonContent}>
              <Text style={styles.secondaryButtonText}>SIGN IN</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117', // Match Figma Bg exactly
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 60,
  },
  logoSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  textSection: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  taglineSmall: {
    color: '#F2F2F2',
    fontSize: 36,
    fontWeight: '900',
    lineHeight: 34,
    letterSpacing: -1,
    // Note: If Bebas Neue is installed, fontFamily: 'Bebas Neue'
  },
  taglineBig: {
    color: '#F2F2F2',
    fontSize: 64,
    fontWeight: '900',
    lineHeight: 60,
    letterSpacing: -1,
  },
  description: {
    color: '#CCCCCC',
    fontSize: 16,
    lineHeight: 22,
    marginTop: 8,
    maxWidth: '85%',
  },
  buttonSection: {
    paddingHorizontal: 24,
    gap: 20,
  },
  primaryButton: {
    height: 54,
    position: 'relative',
  },
  buttonShadow: {
    position: 'absolute',
    bottom: -4,
    left: 2,
    right: 2,
    height: 54,
    backgroundColor: '#52B4F5',
    borderRadius: 100,
    opacity: 0.5,
  },
  buttonContent: {
    flex: 1,
    backgroundColor: '#000000',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  secondaryButton: {
    height: 54,
    position: 'relative',
  },
  secondaryButtonContent: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  secondaryButtonText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default WelcomeScreen;
