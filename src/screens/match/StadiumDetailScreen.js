import React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';
import Header from '../../components/common/Header';
import { stadiumData } from '../../data/mockData';

const StadiumDetailScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <Header
        title="Stadium Details"
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stadium Image placeholder */}
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>🏟️</Text>
            <Text style={styles.imagePlaceholderLabel}>Stadium View</Text>
          </View>
          {/* Pagination dots */}
          <View style={styles.dots}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* Stadium Name */}
        <View style={styles.nameSection}>
          <Text style={styles.stadiumName}>{stadiumData.name}</Text>
          <Text style={styles.stadiumLocation}>{stadiumData.location}</Text>
        </View>

        {/* History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>History</Text>
          <Text style={styles.sectionText}>{stadiumData.history}</Text>
        </View>

        {/* Pitch Report */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, styles.pitchTitle]}>Pitch Report</Text>
          <Text style={[styles.sectionText, styles.pitchText]}>
            {stadiumData.pitchReport}
          </Text>
        </View>

        {/* Last 5 Matches */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Last 5 Matches</Text>
          
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, styles.dateCol]}>Date</Text>
            <Text style={[styles.headerCell, styles.teamCol]}>Team 1</Text>
            <Text style={[styles.headerCell, styles.teamCol]}>Team 2</Text>
          </View>

          {/* Table Rows */}
          {stadiumData.lastMatches.map((match, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.cell, styles.dateCol]}>{match.date}</Text>
              <Text style={[styles.cell, styles.teamCol]}>{match.team1}</Text>
              <Text style={[styles.cell, styles.teamCol]}>{match.team2}</Text>
            </View>
          ))}
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
    paddingBottom: spacing.huge,
  },
  imageContainer: {
    height: 220,
    backgroundColor: colors.cardBackground,
    marginBottom: spacing.lg,
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  imagePlaceholderText: {
    fontSize: 60,
    marginBottom: spacing.sm,
  },
  imagePlaceholderLabel: {
    color: colors.textSecondary,
    ...typography.body,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    position: 'absolute',
    bottom: spacing.md,
    left: 0,
    right: 0,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textMuted,
  },
  dotActive: {
    backgroundColor: colors.textPrimary,
  },
  nameSection: {
    paddingHorizontal: spacing.screenPaddingH,
    marginBottom: spacing.lg,
  },
  stadiumName: {
    color: colors.textPrimary,
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  stadiumLocation: {
    color: colors.textSecondary,
    ...typography.body,
  },
  section: {
    paddingHorizontal: spacing.screenPaddingH,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    color: colors.textPrimary,
    ...typography.h4,
    marginBottom: spacing.md,
  },
  pitchTitle: {
    color: colors.secondary,
  },
  sectionText: {
    color: colors.textSecondary,
    ...typography.body,
    lineHeight: 22,
  },
  pitchText: {
    color: colors.secondary,
    fontStyle: 'italic',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: spacing.sm,
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
  dateCol: {
    flex: 1.5,
  },
  teamCol: {
    flex: 1.2,
    textAlign: 'center',
  },
});

export default StadiumDetailScreen;
