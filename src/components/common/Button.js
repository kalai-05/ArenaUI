import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

const Button = ({
  title,
  onPress,
  variant = 'primary', // primary, secondary, outline, ghost
  size = 'large', // small, medium, large
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const isGhost = variant === 'ghost';

  return (
    <View style={[styles.container, style]}>
      {/* Background/Shadow Layer (for primary/secondary/outline) */}
      {!isGhost && !disabled && (
        <View 
          style={[
            styles.shadowLayer, 
            styles[`shadow_${variant}`],
            styles[`size_${size}`],
          ]} 
        />
      )}
      
      <TouchableOpacity
        style={[
          styles.base,
          styles[variant],
          styles[`size_${size}`],
          disabled && styles.disabled,
        ]}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color={variant === 'primary' ? colors.white : colors.primary} size="small" />
        ) : (
          <Text 
            style={[
              styles.text,
              styles[`text_${variant}`],
              styles[`textSize_${size}`],
              disabled && styles.textDisabled,
              textStyle,
            ]}
          >
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  base: {
    borderRadius: 100, // Pill shape as per Figma "rounded-[100px]"
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  shadowLayer: {
    position: 'absolute',
    top: 4, // Increased offset for more visible depth
    left: 4,
    right: -4,
    borderRadius: 100,
    height: '100%',
    zIndex: -1,
  },
  
  // Shadow colors
  shadow_primary: {
    backgroundColor: '#52B4F5',
    opacity: 0.8,
  },
  shadow_secondary: {
    backgroundColor: '#3B82F6',
    opacity: 0.3,
  },
  shadow_outline: {
    backgroundColor: colors.primaryLight,
    opacity: 0.2,
  },

  // Variants
  primary: {
    backgroundColor: colors.black, // Dark fill as per top layer in Figma
    borderWidth: 1,
    borderColor: '#52B4F5', // Blue border
  },
  secondary: {
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.border,
  },
  outline: {
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  ghost: {
    backgroundColor: colors.transparent,
  },
  
  // Sizes (Height matches Figma ~50px)
  size_small: {
    height: 36,
    paddingHorizontal: spacing.lg,
  },
  size_medium: {
    height: 44,
    paddingHorizontal: spacing.xl,
  },
  size_large: {
    height: 54, // Matches Figma spec
    paddingHorizontal: spacing.buttonPaddingH,
  },
  
  // Disabled
  disabled: {
    backgroundColor: colors.cardBackground,
    borderColor: colors.border,
    opacity: 0.5,
  },
  
  // Text
  text: {
    color: colors.white,
    fontFamily: typography.h1.fontFamily, // Reuse project fontFamily
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase', // Bebas style
    textAlign: 'center',
  },
  text_primary: {
    color: colors.white,
  },
  text_secondary: {
    color: colors.textPrimary,
  },
  text_outline: {
    color: colors.primaryLight,
  },
  text_ghost: {
    color: colors.secondary,
  },
  
  // Text sizes
  textSize_small: {
    fontSize: 12,
  },
  textSize_medium: {
    fontSize: 16,
  },
  textSize_large: {
    fontSize: 20, // Matches Figma "text-[20px]"
  },
  
  textDisabled: {
    color: colors.textMuted,
  },
});

export default Button;
