import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, ActivityIndicator } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';
import Header from '../../components/common/Header';
import { cricketApi } from '../../services/api';
import { transformPlayerProfile, transformPlayerMatchStats } from '../../services/dataTransformers';

const PlayerStatsScreen = ({ navigation, route }) => {
  const player = route?.params?.player || {};
  const playerId = route?.params?.playerId || player?.id;
  const eventId = route?.params?.eventId;
  const fullStats = player.fullStats || {};
  const isBowler = !!fullStats.bowlingStyle;

  // API state
  const [apiProfile, setApiProfile] = useState(null);
  const [matchStats, setMatchStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch player profile from API if we have a playerId
  useEffect(() => {
    if (!playerId) return;

    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const [profileData, summaryData] = await Promise.all([
          cricketApi.getPlayerProfile(playerId).catch(() => null),
          eventId ? cricketApi.getMatchSummary(eventId).catch(() => null) : null,
        ]);

        if (profileData) {
          setApiProfile(transformPlayerProfile(profileData));
        }

        if (summaryData) {
          setMatchStats(transformPlayerMatchStats(summaryData, playerId));
        }
      } catch (err) {
        console.warn('[PlayerStats] Profile fetch failed:', err);
        setError('Could not load full profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [playerId]);

  // Merge API profile with existing player data
  const mergedPlayer = {
    ...player,
    ...(apiProfile ? {
      fullStats: {
        ...fullStats,
        born: apiProfile.nationality || fullStats.born || 'N/A',
        age: apiProfile.dateOfBirth || fullStats.age || 'N/A',
        bowlingStyle: apiProfile.bowlingStyle || fullStats.bowlingStyle,
        battingStyle: apiProfile.battingStyle || fullStats.battingStyle,
        current: matchStats ? {
          title: 'Current Match Stats',
          data: matchStats.batting ? [
            { label: 'Runs', shortLabel: 'R', value: matchStats.batting.runs || '0' },
            { label: 'Balls', shortLabel: 'B', value: matchStats.batting.balls_faced || '0' },
            { label: 'Fours', shortLabel: '4s', value: matchStats.batting.fours || '0' },
            { label: 'Sixes', shortLabel: '6s', value: matchStats.batting.sixes || '0' },
            { label: 'Strike Rate', shortLabel: 'SR', value: matchStats.batting.strike_rate || '0.0' },
          ] : matchStats.bowling ? [
            { label: 'Overs', shortLabel: 'O', value: matchStats.bowling.overs_bowled || '0' },
            { label: 'Maidens', shortLabel: 'M', value: matchStats.bowling.maidens || '0' },
            { label: 'Runs', shortLabel: 'R', value: matchStats.bowling.conceded_runs || '0' },
            { label: 'Wickets', shortLabel: 'W', value: matchStats.bowling.wickets || '0' },
            { label: 'Economy', shortLabel: 'Econ', value: matchStats.bowling.economy_rate || '0.0' },
          ] : fullStats.current?.data
        } : fullStats.current,
      },
      country: apiProfile.country || player.country,
    } : {}),
  };

  const mergedFullStats = mergedPlayer.fullStats || {};
  const mergedIsBowler = !!mergedFullStats.bowlingStyle;

  const renderStatsSection = (section, color = '#9D4CF0') => {
    if (!section) return null;
    return (
      <View style={styles.statsCardWrapper}>
        <View style={[styles.sectionGlow, { backgroundColor: color, opacity: 0.4 }]} />
        <View style={styles.statsCard}>
          <View style={styles.statsCardHeader}>
            <Text style={styles.statsCardTitle}>{section.title}</Text>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.gridRow}>
              {section.data?.slice(0, 5).map((stat, i) => (
                <View key={`top-${i}`} style={styles.statCol5}>
                  <Text style={styles.statLabel}>{stat.shortLabel || stat.label}</Text>
                  <Text style={styles.statValue}>{stat.value}</Text>
                </View>
              ))}
            </View>
            <View style={[styles.gridRow, styles.dividerRow]}>
              {section.data?.slice(5, 10).map((stat, i) => (
                <View key={`bot-${i}`} style={styles.statCol5}>
                  <Text style={styles.statLabel}>{stat.shortLabel || stat.label}</Text>
                  <Text style={styles.statValue}>{stat.value}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderMetricsSection = (section, color = '#3284EB') => {
    if (!section) return null;
    return (
      <View style={styles.statsCardWrapper}>
        <View style={[styles.sectionGlow, { backgroundColor: color, opacity: 0.4 }]} />
        <View style={styles.statsCard}>
          <View style={styles.statsCardHeader}>
            <Text style={styles.statsCardTitle}>{section.title}</Text>
          </View>
          <View style={styles.statsGrid}>
            <View style={styles.gridRow}>
              {section.data?.map((stat, i) => (
                <View key={`metric-${i}`} style={styles.statCol3}>
                  <View style={styles.metricPair}>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                    <Text style={styles.statValueLarge}>{stat.value}</Text>
                  </View>
                  <View style={[styles.metricPair, { marginTop: 8 }]}>
                    <Text style={styles.xStatLabel}>{stat.xLabel || `x${stat.label}`}</Text>
                    <Text style={styles.xStatValue}>{stat.xValue || 'N/A'}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    );
  };

  const playerName = (mergedPlayer.name || player.name || 'Player').replace('\n', ' ');
  const subtitle = 'Stats & Arena Metrics';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#151621" />
      <Header
        title={playerName}
        subtitle={subtitle}
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={{ backgroundColor: colors.background }}
        showsVerticalScrollIndicator={false}
      >
        {loading && (
          <View style={styles.loadingBanner}>
            <ActivityIndicator size="small" color="#3B82F6" />
            <Text style={styles.loadingText}>Loading player profile...</Text>
          </View>
        )}

        {error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Player Profile Card */}
        <View style={styles.profileCardWrapper}>
          <View style={styles.profileGlow} />
          <View style={styles.profileCard}>
            <View style={styles.headerRow}>
              <View style={styles.profileImageWrapper}>
                <View style={styles.profilePlaceholder}>
                  <Text style={styles.profileInitial}>
                    {playerName.charAt(0)}
                  </Text>
                </View>
              </View>
              <View style={styles.profileMainInfo}>
                <View style={{ flex: 1 }}>
                  {playerName.includes(' ') ? (
                    <>
                      <Text style={styles.profileName}>{playerName.split(' ')[0]}</Text>
                      <Text style={styles.profileName}>{playerName.split(' ').slice(1).join(' ')}</Text>
                    </>
                  ) : (
                    <Text style={styles.profileName}>{playerName}</Text>
                  )}
                </View>
                {(mergedPlayer.country || player.country) && (
                  <View style={styles.flagBadge}>
                    <Text style={styles.countryFlag}>{mergedPlayer.country || player.country}</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Bio info Row */}
            <View style={styles.bioRow}>
              <View style={styles.bioItem}>
                <Text style={styles.bioLabel}>Born</Text>
                <Text style={styles.bioValue}>{mergedFullStats.born || 'N/A'}</Text>
              </View>
              <View style={styles.bioItem}>
                <Text style={styles.bioLabel}>Age</Text>
                <Text style={styles.bioValue}>{mergedFullStats.age || 'N/A'}</Text>
              </View>
              <View style={styles.bioItem}>
                <Text style={styles.bioLabel}>{mergedIsBowler ? 'Bowling Style' : 'Batting Style'}</Text>
                <Text style={styles.bioValue}>
                  {mergedFullStats.bowlingStyle || mergedFullStats.battingStyle || 'N/A'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Stats Sections */}
        <View style={styles.statsSectionContainer}>
          {renderStatsSection(mergedFullStats.current)}
          {renderStatsSection(mergedFullStats.allTime, '#1C2431')}
          {mergedFullStats.metrics?.current && renderMetricsSection(mergedFullStats.metrics.current)}
          {mergedFullStats.metrics?.allTime && renderMetricsSection(mergedFullStats.metrics.allTime, '#1C2431')}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  loadingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 8,
  },
  loadingText: {
    color: '#CCCCCC',
    fontSize: 12,
  },
  errorBanner: {
    backgroundColor: 'rgba(230, 57, 70, 0.15)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginTop: 4,
    borderRadius: 6,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 11,
    textAlign: 'center',
  },
  profileCardWrapper: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 20,
    position: 'relative',
  },
  profileGlow: {
    position: 'absolute',
    top: 15,
    left: 15,
    right: 15,
    height: 30,
    backgroundColor: 'rgba(157, 76, 240, 0.4)',
    borderRadius: 16,
  },
  profileCard: {
    backgroundColor: 'rgba(18, 24, 33, 0.85)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImageWrapper: {
    width: 90,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#1E1B2E',
    overflow: 'hidden',
    marginRight: 16,
  },
  profilePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
  },
  profileMainInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  profileName: {
    color: '#F0F6FC',
    fontSize: 28,
    fontWeight: '700',
    flex: 1,
    lineHeight: 32,
  },
  flagBadge: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 4,
    borderRadius: 4,
  },
  countryFlag: {
    fontSize: 20,
  },
  bioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#161D27',
    borderRadius: 8,
    padding: 10,
  },
  bioItem: {
    alignItems: 'center',
    flex: 1,
  },
  bioLabel: {
    color: '#CCCCCC',
    fontSize: 10,
    marginBottom: 2,
  },
  bioValue: {
    color: '#F0F6FC',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  statsSectionContainer: {
    paddingHorizontal: 16,
  },
  statsCardWrapper: {
    position: 'relative',
    marginBottom: 20,
    paddingTop: 8,
  },
  sectionGlow: {
    position: 'absolute',
    top: 15,
    left: 15,
    right: 15,
    height: 20,
    borderRadius: 12,
  },
  statsCard: {
    backgroundColor: 'rgba(18, 24, 33, 0.85)',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  statsCardHeader: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  statsCardTitle: {
    color: '#F2F2F2',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  statsGrid: {
    padding: 12,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dividerRow: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  statCol5: {
    width: '20%',
    alignItems: 'center',
  },
  statCol3: {
    width: '33%',
    alignItems: 'center',
  },
  metricPair: {
    alignItems: 'center',
  },
  statLabel: {
    color: '#CCCCCC',
    fontSize: 10,
    marginBottom: 4,
    textAlign: 'center',
  },
  statValue: {
    color: '#F0F6FC',
    fontSize: 12,
    fontWeight: '600',
  },
  statValueLarge: {
    color: '#F0F6FC',
    fontSize: 13,
    fontWeight: '700',
  },
  xStatLabel: {
    color: '#B3B3B3',
    fontSize: 10,
    marginBottom: 4,
  },
  xStatValue: {
    color: '#F0F6FC',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default PlayerStatsScreen;
