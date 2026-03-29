import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Header from '../../components/common/Header';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <Header showLogo />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>SIGN IN WITH YOUR ARENA ID</Text>

        {/* Gradient overlay */}
        <View style={styles.gradientSection} />

        {/* Form */}
        <View style={styles.formSection}>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Text style={styles.helperText}>
            We store your preferences, so that you may receive live,{'\n'}
            personalised notifications
          </Text>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <View style={styles.buttonSection}>
          <Button
            title="SIGN IN"
            onPress={() => navigation.navigate('MainTabs')}
            variant="primary"
          />
          <Text style={styles.disclaimer}>
            Your ARENA account is now ARENA ID. If you've signed{'\n'}
            into the app before, use the same credentials here,{'\n'}
            otherwise create your account{' '}
            <Text
              style={styles.disclaimerLink}
              onPress={() => navigation.navigate('CreateAccount')}
            >
              here
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.xxxl,
  },
  title: {
    color: colors.textPrimary,
    ...typography.h2,
    paddingHorizontal: spacing.screenPaddingH,
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  gradientSection: {
    height: 60,
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
  },
  formSection: {
    paddingHorizontal: spacing.screenPaddingH,
    paddingTop: spacing.xxl,
  },
  helperText: {
    color: colors.textSecondary,
    ...typography.bodySmall,
    marginTop: spacing.sm,
    lineHeight: 18,
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: spacing.xxl,
    marginBottom: spacing.xl,
  },
  forgotPasswordText: {
    color: colors.textLink,
    ...typography.body,
    textDecorationLine: 'underline',
  },
  buttonSection: {
    paddingHorizontal: spacing.screenPaddingH,
    marginTop: 'auto',
  },
  disclaimer: {
    color: colors.textSecondary,
    ...typography.bodySmall,
    marginTop: spacing.lg,
    lineHeight: 18,
  },
  disclaimerLink: {
    color: colors.textLink,
    textDecorationLine: 'underline',
  },
});

export default SignInScreen;
