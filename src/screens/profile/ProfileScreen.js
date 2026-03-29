import React from 'react';
import {
  View, Text, StyleSheet, StatusBar, ScrollView,
  TouchableOpacity, Alert,
} from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';
import Header from '../../components/common/Header';
import { profileData } from '../../data/mockData';

const ProfileScreen = ({ navigation }) => {
  const menuItems = [
    { icon: '🔔', label: 'Notifications', action: () => {} },
    { icon: '⚙️', label: 'Settings', action: () => {} },
    { icon: '📬', label: 'Get in Touch', action: () => {} },
    { icon: '📋', label: 'Terms & Conditions', action: () => {} },
    { icon: '🛡️', label: 'Privacy Policy', action: () => {} },
    { icon: '🚪', label: 'Logout', action: () => handleLogout(), isDestructive: true },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => navigation.reset({
            index: 0,
            routes: [{ name: 'Welcome' }],
          }),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <Header showLogo />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {profileData.name.charAt(0)}
            </Text>
          </View>
          <Text style={styles.name}>{profileData.name}</Text>
          <Text style={styles.memberSince}>
            Member since {profileData.memberSince}
          </Text>
        </View>

        {/* Contact Info */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{profileData.email}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoValue}>{profileData.phone}</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.action}
              activeOpacity={0.7}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={[
                styles.menuLabel,
                item.isDestructive && styles.destructiveLabel,
              ]}>
                {item.label}
              </Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* App Version */}
        <Text style={styles.appVersion}>Arena v1.0.0</Text>
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
    paddingBottom: spacing.huge,
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    marginHorizontal: spacing.screenPaddingH,
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    color: colors.white,
    ...typography.h1,
  },
  name: {
    color: colors.textPrimary,
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  memberSince: {
    color: colors.textSecondary,
    ...typography.bodySmall,
  },
  infoCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: spacing.cardRadius,
    marginHorizontal: spacing.screenPaddingH,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  infoLabel: {
    color: colors.textMuted,
    ...typography.body,
  },
  infoValue: {
    color: colors.textPrimary,
    ...typography.body,
  },
  menuSection: {
    marginHorizontal: spacing.screenPaddingH,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: spacing.lg,
  },
  menuLabel: {
    color: colors.textPrimary,
    ...typography.bodyLarge,
    flex: 1,
  },
  destructiveLabel: {
    color: colors.danger,
  },
  menuArrow: {
    color: colors.textMuted,
    fontSize: 22,
  },
  appVersion: {
    color: colors.textMuted,
    ...typography.caption,
    textAlign: 'center',
    marginTop: spacing.xxl,
  },
});

export default ProfileScreen;
