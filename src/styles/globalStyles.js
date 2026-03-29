import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

export const globalStyles = StyleSheet.create({
  // Screen containers
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screenCenter: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenPadded: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.screenPaddingH,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.tabBarHeight + spacing.xl,
  },
  
  // Cards
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: spacing.cardRadius,
    padding: spacing.cardPadding,
    marginBottom: spacing.cardMargin,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardNoPadding: {
    backgroundColor: colors.cardBackground,
    borderRadius: spacing.cardRadius,
    marginBottom: spacing.cardMargin,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  
  // Flex utilities
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowAround: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexOne: {
    flex: 1,
  },
  
  // Text styles
  textPrimary: {
    color: colors.textPrimary,
    ...typography.body,
  },
  textSecondary: {
    color: colors.textSecondary,
    ...typography.body,
  },
  textMuted: {
    color: colors.textMuted,
    ...typography.bodySmall,
  },
  textAccent: {
    color: colors.textAccent,
    ...typography.body,
  },
  heading1: {
    color: colors.textPrimary,
    ...typography.h1,
  },
  heading2: {
    color: colors.textPrimary,
    ...typography.h2,
  },
  heading3: {
    color: colors.textPrimary,
    ...typography.h3,
  },
  heading4: {
    color: colors.textPrimary,
    ...typography.h4,
  },
  
  // Divider
  divider: {
    height: 1,
    backgroundColor: colors.border,
    width: '100%',
  },
  
  // Shadow
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  
  // Status badge
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  statusLive: {
    backgroundColor: colors.live,
  },
  statusUpcoming: {
    backgroundColor: colors.upcoming,
  },
  statusCompleted: {
    backgroundColor: colors.completed,
  },
});
