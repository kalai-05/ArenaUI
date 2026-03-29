import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
  
  // Screen padding
  screenPaddingH: 16,
  screenPaddingV: 12,
  
  // Card
  cardPadding: 16,
  cardMargin: 12,
  cardRadius: 12,
  
  // Button
  buttonPaddingH: 24,
  buttonPaddingV: 14,
  buttonRadius: 8,
  
  // Input
  inputPaddingH: 16,
  inputPaddingV: 14,
  inputRadius: 8,
  
  // Bottom tab bar
  tabBarHeight: 60,
  
  // Header
  headerHeight: 56,
};

export const layout = {
  screenWidth: width,
  screenHeight: height,
  isSmallScreen: width < 375,
};
