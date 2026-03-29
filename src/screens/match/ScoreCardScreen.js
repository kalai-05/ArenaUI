import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';
import Header from '../../components/common/Header';
import TabSelector from '../../components/common/TabSelector';
import { scorecardData } from '../../data/mockData';

const ScoreCardScreen = ({ navigation }) => {
  const [activeInnings, setActiveInnings] = useState(0);
  const innings = activeInnings === 0
    ? scorecardData.firstInnings
    : scorecardData.secondInnings;

  const renderBattingRow = (batsman, index) => (
    <View key={index} style={[styles.row, batsman.isHighlight && styles.highlightRow]}>
      <View style={styles.nameCell}>
        <Text style={styles.playerName}>{batsman.name}</Text>
        <Text style={styles.howOut}>{batsman.howOut}</Text>
      </View>
      <Text style={[styles.cell, styles.scoreCell]}>{batsman.r}</Text>
      <Text style={styles.cell}>{batsman.b}</Text>
      <Text style={styles.cell}>{batsman.fours}</Text>
      <Text style={styles.cell}>{batsman.sixes}</Text>
      <Text style={styles.cell}>{batsman.sr}</Text>
    </View>
  );

  const renderBowlingRow = (bowler, index) => (
    <View key={index} style={[styles.row, bowler.isHighlight && styles.highlightRow]}>
      <View style={styles.nameCell}>
        <Text style={styles.playerName}>{bowler.name}</Text>
      </View>
      <Text style={styles.cell}>{bowler.o}</Text>
      <Text style={styles.cell}>{bowler.m}</Text>
      <Text style={styles.cell}>{bowler.r}</Text>
      <Text style={[styles.cell, styles.scoreCell]}>{bowler.w}</Text>
      <Text style={styles.cell}>{bowler.wd}</Text>
      <Text style={styles.cell}>{bowler.nb}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <Header
        title="Scorecard"
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <TabSelector
        tabs={[`${scorecardData.firstInnings.team}`, `${scorecardData.secondInnings.team}`]}
        activeTab={activeInnings}
        onTabChange={setActiveInnings}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Team header */}
        <View style={styles.teamHeader}>
          <Text style={styles.teamFlag}>{innings.flag}</Text>
          <Text style={styles.teamName}>{innings.team}</Text>
          {innings.target && (
            <Text style={styles.target}>{innings.target}</Text>
          )}
        </View>

        {/* Total */}
        <View style={styles.totalRow}>
          <Text style={styles.totalScore}>{innings.totalScore}</Text>
          <Text style={styles.totalOvers}>{innings.totalOvers}</Text>
        </View>

        {/* Batting Header */}
        <View style={styles.headerRow}>
          <View style={styles.nameCell}>
            <Text style={styles.headerText}>Batter</Text>
          </View>
          <Text style={[styles.cell, styles.headerText]}>R</Text>
          <Text style={[styles.cell, styles.headerText]}>B</Text>
          <Text style={[styles.cell, styles.headerText]}>4s</Text>
          <Text style={[styles.cell, styles.headerText]}>6s</Text>
          <Text style={[styles.cell, styles.headerText]}>SR</Text>
        </View>

        {/* Batting rows */}
        {innings.batting.map(renderBattingRow)}

        {/* Extras */}
        <View style={styles.extrasRow}>
          <Text style={styles.extrasLabel}>Extras</Text>
          <Text style={styles.extrasValue}>
            {innings.extras.total} {innings.extras.detail}
          </Text>
        </View>

        {/* Did not bat */}
        {innings.didNotBat && innings.didNotBat.length > 0 && (
          <View style={styles.didNotBat}>
            <Text style={styles.didNotBatLabel}>Did not bat: </Text>
            <Text style={styles.didNotBatNames}>
              {innings.didNotBat.join(', ')}
            </Text>
          </View>
        )}

        {/* Fall of wickets */}
        {innings.fallOfWickets && (
          <View style={styles.fowSection}>
            <Text style={styles.fowTitle}>Fall of Wickets</Text>
            {innings.fallOfWickets.map((fow, i) => (
              <View key={i} style={styles.fowRow}>
                <Text style={styles.fowScore}>{fow.score}</Text>
                <Text style={styles.fowPlayer}>{fow.player}</Text>
                <Text style={styles.fowOvers}>{fow.overs}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Divider */}
        <View style={styles.divider} />

        {/* Bowling Header */}
        <View style={styles.headerRow}>
          <View style={styles.nameCell}>
            <Text style={styles.headerText}>Bowler</Text>
          </View>
          <Text style={[styles.cell, styles.headerText]}>O</Text>
          <Text style={[styles.cell, styles.headerText]}>M</Text>
          <Text style={[styles.cell, styles.headerText]}>R</Text>
          <Text style={[styles.cell, styles.headerText]}>W</Text>
          <Text style={[styles.cell, styles.headerText]}>WD</Text>
          <Text style={[styles.cell, styles.headerText]}>NB</Text>
        </View>

        {/* Bowling rows */}
        {innings.bowling.map(renderBowlingRow)}
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
    paddingHorizontal: spacing.screenPaddingH,
    paddingBottom: spacing.huge,
  },
  teamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
    marginTop: spacing.md,
  },
  teamFlag: {
    fontSize: 20,
  },
  teamName: {
    color: colors.textPrimary,
    ...typography.h3,
  },
  target: {
    color: colors.textSecondary,
    ...typography.bodySmall,
    marginLeft: 'auto',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
  },
  totalScore: {
    color: colors.textPrimary,
    ...typography.scoreMedium,
  },
  totalOvers: {
    color: colors.textSecondary,
    ...typography.body,
    alignSelf: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerText: {
    color: colors.textMuted,
    ...typography.labelSmall,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  highlightRow: {
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
  },
  nameCell: {
    flex: 2,
    paddingRight: spacing.sm,
  },
  cell: {
    flex: 0.7,
    color: colors.textSecondary,
    ...typography.body,
    textAlign: 'center',
  },
  scoreCell: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
  playerName: {
    color: colors.textPrimary,
    ...typography.body,
    fontWeight: '500',
  },
  howOut: {
    color: colors.textMuted,
    ...typography.caption,
    marginTop: 2,
  },
  extrasRow: {
    flexDirection: 'row',
    paddingVertical: spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  extrasLabel: {
    color: colors.textMuted,
    ...typography.body,
    marginRight: spacing.md,
  },
  extrasValue: {
    color: colors.textSecondary,
    ...typography.body,
  },
  didNotBat: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: spacing.md,
  },
  didNotBatLabel: {
    color: colors.textMuted,
    ...typography.bodySmall,
  },
  didNotBatNames: {
    color: colors.textSecondary,
    ...typography.bodySmall,
    flex: 1,
  },
  fowSection: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  fowTitle: {
    color: colors.textPrimary,
    ...typography.label,
    marginBottom: spacing.sm,
  },
  fowRow: {
    flexDirection: 'row',
    paddingVertical: spacing.xs,
    justifyContent: 'space-between',
  },
  fowScore: {
    color: colors.textPrimary,
    ...typography.body,
    width: 60,
  },
  fowPlayer: {
    color: colors.textSecondary,
    ...typography.body,
    flex: 1,
  },
  fowOvers: {
    color: colors.textMuted,
    ...typography.bodySmall,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
});

export default ScoreCardScreen;
