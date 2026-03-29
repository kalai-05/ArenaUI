import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';
import Header from '../../components/common/Header';

const StatsHubScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <Header showLogo />
      
      <View style={styles.content}>
        <Text style={styles.title}>Stats Hub</Text>
        <Text style={styles.subtitle}>Coming Soon</Text>
        <Text style={styles.description}>
          Advanced analytics, leaderboards, and{'\n'}
          head-to-head comparisons
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  title: {
    color: colors.textPrimary,
    ...typography.h2,
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.primary,
    ...typography.h3,
    marginBottom: spacing.md,
  },
  description: {
    color: colors.textSecondary,
    ...typography.body,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default StatsHubScreen;
