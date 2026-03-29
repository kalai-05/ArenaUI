import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';
import Header from '../../components/common/Header';
import ArenaLogo from '../../components/common/ArenaLogo';

const ArenaScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <Header showLogo />
      
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <ArenaLogo size={120} />
        </View>
        <Text style={styles.title}>Arena</Text>
        <Text style={styles.subtitle}>Your Cricket Command Center</Text>
        <Text style={styles.description}>
          Live matches, advanced analytics,{'\n'}
          and real-time metrics at your fingertips
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
  logoContainer: {
    marginBottom: spacing.xl,
  },
  title: {
    color: colors.textPrimary,
    ...typography.h1,
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.primary,
    ...typography.h4,
    marginBottom: spacing.md,
  },
  description: {
    color: colors.textSecondary,
    ...typography.body,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default ArenaScreen;
