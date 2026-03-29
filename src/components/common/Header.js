import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../styles/colors';
import ArenaLogo from './ArenaLogo';

const Header = ({
  title,
  subtitle,
  showBack = false,
  onBackPress,
  showLogo = false,
  rightComponent,
  style,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[
      styles.container, 
      { paddingTop: Math.max(insets.top, 16), height: insets.top + (showLogo ? 64 : 56) },
      style
    ]}>
      <View style={styles.leftSection}>
        {showBack && (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Svg width="22" height="24" viewBox="0 0 22 24" fill="none">
              <Path d="M15 18L9 12L15 6" stroke={colors.textPrimary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </TouchableOpacity>
        )}
        {showLogo && (
          <View style={styles.logoContainer}>
            <ArenaLogo size={32} />
            <Text style={styles.logoText}>ARENA</Text>
          </View>
        )}
        {title && !showLogo && (
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
              {subtitle && (
                <Text style={styles.subtitle}> - {subtitle}</Text>
              )}
            </Text>
          </View>
        )}
      </View>
      {rightComponent && (
        <View style={styles.rightSection}>{rightComponent}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#151621',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: '#F0F6FC',
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    color: '#F0F6FC',
    fontSize: 14,
    fontWeight: '400',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    color: '#F0F6FC',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
});

export default Header;
