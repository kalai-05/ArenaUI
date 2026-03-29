import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, ActivityIndicator } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';
import Header from '../../components/common/Header';
import { cricketApi } from '../../services/api';
import { transformSummaryToStadium } from '../../services/dataTransformers';
import { stadiumData as mockStadiumData } from '../../data/mockData';

const StadiumDetailScreen = ({ navigation, route }) => {
  const eventId = route?.params?.eventId;
  const [stadiumData, setStadiumData] = useState(mockStadiumData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conditions, setConditions] = useState(null);

  useEffect(() => {
    if (!eventId) return;

    const fetchStadiumDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await cricketApi.getMatchSummary(eventId);
        const transformed = transformSummaryToStadium(data);

        // Merge API data with existing mock structure for fields API doesn't provide
        setStadiumData({
          ...mockStadiumData,
          name: transformed.name || mockStadiumData.name,
          location: transformed.location || mockStadiumData.location,
          pitchReport: transformed.pitchReport !== 'Pitch report not available'
            ? transformed.pitchReport
            : mockStadiumData.pitchReport,
        });

        setConditions({
          weather: transformed.weather,
          dayNight: transformed.dayNight,
          capacity: transformed.capacity,
          bowlingEnds: transformed.bowlingEnds,
        });
      } catch (err) {
        console.warn('[StadiumDetail] Fetch failed, using mock:', err);
        setError('Using cached stadium data');
      } finally {
        setLoading(false);
      }
    };
    fetchStadiumDetails();
  }, [eventId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.background} />
        <Header title="Stadium Details" showBack onBackPress={() => navigation.goBack()} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text style={styles.loadingText}>Loading stadium info...</Text>
        </View>
      </View>
    );
  }

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
        {error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Stadium Image placeholder */}
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>🏟️</Text>
            <Text style={styles.imagePlaceholderLabel}>Stadium View</Text>
          </View>
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

        {/* Conditions from API */}
        {conditions && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Match Conditions</Text>
            <View style={styles.conditionsGrid}>
              {conditions.capacity && conditions.capacity !== 'N/A' && (
                <View style={styles.conditionItem}>
                  <Text style={styles.conditionLabel}>Capacity</Text>
                  <Text style={styles.conditionValue}>{conditions.capacity}</Text>
                </View>
              )}
              {conditions.dayNight && (
                <View style={styles.conditionItem}>
                  <Text style={styles.conditionLabel}>Format</Text>
                  <Text style={styles.conditionValue}>
                    {conditions.dayNight === 'day' ? '☀️ Day' : conditions.dayNight === 'night' ? '🌙 Night' : '🌅 Day/Night'}
                  </Text>
                </View>
              )}
              {conditions.bowlingEnds && conditions.bowlingEnds.length > 0 && (
                <View style={styles.conditionItem}>
                  <Text style={styles.conditionLabel}>Bowling Ends</Text>
                  <Text style={styles.conditionValue}>{conditions.bowlingEnds.join(' / ')}</Text>
                </View>
              )}
            </View>
            {conditions.weather && conditions.weather !== 'Weather info not available' && (
              <View style={styles.weatherRow}>
                <Text style={styles.weatherLabel}>🌤 Weather</Text>
                <Text style={styles.weatherValue}>{conditions.weather}</Text>
              </View>
            )}
          </View>
        )}

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
        {stadiumData.lastMatches && stadiumData.lastMatches.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Last 5 Matches</Text>

            <View style={styles.tableHeader}>
              <Text style={[styles.headerCell, styles.dateCol]}>Date</Text>
              <Text style={[styles.headerCell, styles.teamCol]}>Team 1</Text>
              <Text style={[styles.headerCell, styles.teamCol]}>Team 2</Text>
            </View>

            {stadiumData.lastMatches.map((match, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.cell, styles.dateCol]}>{match.date}</Text>
                <Text style={[styles.cell, styles.teamCol]}>{match.team1}</Text>
                <Text style={[styles.cell, styles.teamCol]}>{match.team2}</Text>
              </View>
            ))}
          </View>
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#CCCCCC',
    fontSize: 14,
    marginTop: 12,
  },
  errorBanner: {
    backgroundColor: 'rgba(230, 57, 70, 0.15)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 6,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 11,
    textAlign: 'center',
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
    color: colors.accent,
  },
  sectionText: {
    color: colors.textSecondary,
    ...typography.body,
    lineHeight: 22,
  },
  pitchText: {
    color: colors.accent,
    fontStyle: 'italic',
  },
  conditionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  conditionItem: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
    padding: 10,
    minWidth: '30%',
    flex: 1,
  },
  conditionLabel: {
    color: colors.textMuted,
    fontSize: 10,
    marginBottom: 4,
  },
  conditionValue: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  weatherRow: {
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    borderRadius: 8,
    padding: 10,
  },
  weatherLabel: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  weatherValue: {
    color: colors.textSecondary,
    fontSize: 12,
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
