import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';
import Button from './Button';

const FollowListItem = ({
  name,
  subtitle,
  image,
  flag,
  isFollowing = false,
  onFollowPress,
  type = 'player', // 'player' or 'team'
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {type === 'team' ? (
          <View style={styles.flagContainer}>
            <Text style={styles.flagText}>{flag || '🏏'}</Text>
          </View>
        ) : (
          <View style={styles.avatarContainer}>
            {image ? (
              <Image source={{ uri: image }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>{name?.charAt(0)}</Text>
              </View>
            )}
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
      
      <Button
        title={isFollowing ? 'FOLLOWING' : 'FOLLOW'}
        onPress={onFollowPress}
        variant={isFollowing ? 'primary' : 'secondary'}
        size="small"
        style={styles.followButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.screenPaddingH,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flagContainer: {
    width: 36,
    height: 24,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  flagText: {
    fontSize: 24,
  },
  avatarContainer: {
    marginRight: spacing.md,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardBackgroundLight,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardBackgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: colors.textPrimary,
    ...typography.label,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    color: colors.textPrimary,
    ...typography.bodyLarge,
    fontWeight: '500',
  },
  subtitle: {
    color: colors.textSecondary,
    ...typography.bodySmall,
    marginTop: 2,
  },
  followButton: {
    width: 100, // Fixed width for list items
  },
});

export default FollowListItem;
