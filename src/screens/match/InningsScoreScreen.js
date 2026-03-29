import React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';
import Header from '../../components/common/Header';
import { inningsScoreData } from '../../data/mockData';

const InningsScoreScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <Header
        title={inningsScoreData.title}
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, styles.dateCell]}>Date</Text>
          <Text style={[styles.headerCell, styles.teamsCell]}>Teams</Text>
          <Text style={[styles.headerCell, styles.scoreCell]}>Score</Text>
        </View>

        {/* Table Rows */}
        {inningsScoreData.rows.map((row, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.cell, styles.dateCell]}>{row.date}</Text>
            <Text style={[styles.cell, styles.teamsCell]}>{row.teams}</Text>
            <Text style={[styles.cell, styles.scoreCell, styles.scoreText]}>{row.score}</Text>
          </View>
        ))}

        {/* Average */}
        <View style={[styles.tableRow, styles.averageRow]}>
          <Text style={[styles.cell, styles.dateCell, styles.averageLabel]}>Average</Text>
          <Text style={[styles.cell, styles.teamsCell]} />
          <Text style={[styles.cell, styles.scoreCell, styles.averageValue]}>
            {inningsScoreData.average}
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
    paddingHorizontal: spacing.screenPaddingH,
    paddingBottom: spacing.huge,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerCell: {
    color: colors.textMuted,
    ...typography.labelSmall,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  cell: {
    color: colors.textSecondary,
    ...typography.body,
  },
  dateCell: {
    flex: 1.5,
  },
  teamsCell: {
    flex: 2,
    textAlign: 'center',
  },
  scoreCell: {
    flex: 1,
    textAlign: 'right',
  },
  scoreText: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  averageRow: {
    backgroundColor: colors.cardBackground,
    borderRadius: 4,
    marginTop: spacing.md,
  },
  averageLabel: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  averageValue: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 18,
  },
});

export default InningsScoreScreen;
