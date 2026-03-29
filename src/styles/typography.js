import { Platform } from 'react-native';

const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
});

export const typography = {
  // Headings
  h1: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 1.5,
    fontFamily,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 1,
    fontFamily,
  },
  h3: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
    fontFamily,
  },
  h4: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily,
  },
  
  // Body text
  bodyLarge: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily,
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily,
  },
  bodySmall: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily,
  },
  
  // Labels
  label: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily,
  },
  labelSmall: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily,
  },
  
  // Caption
  caption: {
    fontSize: 10,
    fontWeight: '400',
    fontFamily,
  },
  
  // Button text
  button: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 2,
    fontFamily,
  },
  buttonSmall: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    fontFamily,
  },
  
  // Score text
  scoreLarge: {
    fontSize: 28,
    fontWeight: '800',
    fontFamily,
  },
  scoreMedium: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily,
  },
  scoreSmall: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily,
  },
  
  // Stats
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '400',
    fontFamily,
  },
};
