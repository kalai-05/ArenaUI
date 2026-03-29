import React from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';
import Header from '../../components/common/Header';
import { pastOversData } from '../../data/mockData';

const getBallColor = (type) => {
  switch (type) {
    case 'wicket': return colors.dotWicket;
    case 'four': return colors.dotFour;
    case 'six': return colors.dotSix;
    case 'dot': return colors.dotZero;
    case 'wide': return colors.textMuted;
    default: return colors.dotRun;
  }
};

const getBallTextColor = (type) => {
  if (type === 'wicket' || type === 'six') return colors.white;
  return colors.textPrimary;
};

const PastOversScreen = ({ navigation }) => {
  const renderOverItem = ({ item }) => (
    <View style={styles.overItem}>
      <View style={styles.overHeader}>
        <Text style={styles.overLabel}>
          <Text style={styles.overBold}>Over-{String(item.over).padStart(2, '0')}</Text>
          <Text style={styles.overRuns}> / {item.runs}</Text>
        </Text>
        <Text style={styles.teamScore}>{item.teamScore}</Text>
      </View>
      <Text style={styles.bowlerName}>{item.bowler}</Text>
      <View style={styles.ballsRow}>
        {item.balls.map((ball, i) => (
          <View
            key={i}
            style={[
              styles.ball,
              { backgroundColor: getBallColor(ball.type) },
            ]}
          >
            <Text style={[styles.ballText, { color: getBallTextColor(ball.type) }]}>
              {ball.runs}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <Header
        title="India vs South Africa 5th iT20"
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <FlatList
        data={pastOversData}
        keyExtractor={(item) => `over-${item.over}`}
        renderItem={renderOverItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingHorizontal: spacing.screenPaddingH,
    paddingBottom: spacing.huge,
  },
  overItem: {
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  overHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  overLabel: {
    color: colors.textPrimary,
  },
  overBold: {
    ...typography.label,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  overRuns: {
    ...typography.body,
    color: colors.textSecondary,
  },
  teamScore: {
    color: colors.textSecondary,
    ...typography.body,
  },
  bowlerName: {
    color: colors.textSecondary,
    ...typography.bodySmall,
    marginBottom: spacing.sm,
  },
  ballsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  ball: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ballText: {
    ...typography.labelSmall,
    fontWeight: '700',
  },
});

export default PastOversScreen;
