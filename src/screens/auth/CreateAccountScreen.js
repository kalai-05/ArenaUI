import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Header from '../../components/common/Header';

const CreateAccountScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <Header showLogo />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>CREATE YOUR ARENA ID</Text>

        {/* Gradient overlay */}
        <View style={styles.gradientSection} />

        {/* Form */}
        <View style={styles.formSection}>
          <Input
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
          />
          <Input
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
          />
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
            helperText="Password must be at least 8 characters long and include 1 capital letter and 1 symbol"
          />

          {/* Terms checkbox */}
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setAgreed(!agreed)}
          >
            <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
              {agreed && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.termsText}>
              I agree to the{' '}
              <Text style={styles.link}>Terms</Text>
              {' '}and{' '}
              <Text style={styles.link}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Button */}
        <View style={styles.buttonSection}>
          <Button
            title="SIGN UP"
            onPress={() => navigation.navigate('FollowTeams')}
            variant="primary"
            disabled={!agreed}
          />
          <Text style={styles.disclaimer}>
            By agreeing to the above terms, you are consenting that{'\n'}
            your personal information will be collected, stored, and{'\n'}
            processed in the United States and the European Union{'\n'}
            on behalf of{' '}
            <Text style={styles.link}>Winning Formula LLP</Text>
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
    height: 40,
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
  },
  formSection: {
    paddingHorizontal: spacing.screenPaddingH,
    paddingTop: spacing.xxl,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 3,
    marginRight: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  termsText: {
    color: colors.textSecondary,
    ...typography.body,
    flex: 1,
  },
  link: {
    color: colors.textLink,
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
});

export default CreateAccountScreen;
