import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, StyleSheet, StatusBar, ScrollView, ActivityIndicator, Dimensions, FlatList
} from 'react-native';
import { colors } from '../../styles/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
import { spacing } from '../../styles/spacing';
import Header from '../../components/common/Header';
import MatchHeader from '../../components/common/MatchHeader';
import TabSelector from '../../components/common/TabSelector';
import GodsEyeView from '../../components/match/GodsEyeView';
import Timeline from '../../components/match/Timeline';
import ImpactMetrics from '../../components/match/ImpactMetrics';
import PlayerCard from '../../components/common/PlayerCard';
import { cricketApi, getTodayDate, getCountryFlag } from '../../services/api';
import { transformMatchToCard, transformLineupsToSquad, transformLiveMatchStats } from '../../services/dataTransformers';
import { cacheLineupsPlayers } from '../../services/playerCache';
// Keep mock data as fallback
import {
  matchData as mockMatchData, godsEyeView, timelineData as mockTimelineData,
  playersData, squadData as mockSquadData,
} from '../../data/mockData';

const HomeScreen = ({ navigation }) => {
  const [activeMatchTab, setActiveMatchTab] = useState(0);
  const [activeContentTab, setActiveContentTab] = useState(0);

  // API state
  const [liveMatches, setLiveMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [completedMatches, setCompletedMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [squadData, setSquadData] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [timelineData, setTimelineData] = useState(null);
  const [activeMatchStats, setActiveMatchStats] = useState(null);

  // Live polling ref
  const pollingRef = useRef(null);

  // Fetch live schedule
  const fetchLiveSchedule = useCallback(async () => {
    try {
      const data = await cricketApi.getLiveSchedule();
      const events = data?.sport_events || [];
      const mapped = events.map(evt =>
        transformMatchToCard(evt, evt?.sport_event_status)
      );
      setLiveMatches(mapped);
      // Select first live match for details
      if (mapped.length > 0 && !selectedEventId) {
        setSelectedEventId(mapped[0].id);
      }

      // Background fetch summaries to get scores
      events.forEach(async (evt) => {
        try {
          const summaryData = await cricketApi.getMatchSummary(evt.id);
          const updatedCard = transformMatchToCard(summaryData.sport_event, summaryData.sport_event_status);
          setLiveMatches(prev => prev.map(m => m.id === evt.id ? updatedCard : m));
        } catch (err) {
          console.log('[HomeScreen] Background summary fetch failed for', evt.id);
        }
      });
      return mapped;
    } catch (err) {
      console.warn('[HomeScreen] Live schedule fetch failed:', err);
      return [];
    }
  }, [selectedEventId]);

  // Fetch daily schedule (for upcoming + completed)
  const fetchDailySchedule = useCallback(async () => {
    try {
      const today = getTodayDate();
      const data = await cricketApi.getDailySchedule(today);
      const events = data?.sport_events || [];
      const upcoming = [];
      const completed = [];

      events.forEach(evt => {
        const card = transformMatchToCard(evt, evt?.sport_event_status);
        if (card.status === 'completed') {
          completed.push(card);
        } else if (card.status === 'upcoming') {
          upcoming.push(card);
        }
      });

      setUpcomingMatches(upcoming);
      setCompletedMatches(completed);

      // Background fetch summaries for completed matches to get final scores
      // (Upcoming matches don't have scores yet, so skip them to save API limits)
      const completedEvents = events.filter(e => e.status === 'closed' || e.status === 'ended');
      completedEvents.forEach(async (evt) => {
        try {
          const summaryData = await cricketApi.getMatchSummary(evt.id);
          const updatedCard = transformMatchToCard(summaryData.sport_event, summaryData.sport_event_status);
          setCompletedMatches(prev => prev.map(m => m.id === evt.id ? updatedCard : m));
        } catch (err) {
          console.log('[HomeScreen] Background summary fetch failed for', evt.id);
        }
      });
    } catch (err) {
      console.warn('[HomeScreen] Daily schedule fetch failed:', err);
    }
  }, []);

  // Fetch lineups for selected match
  const fetchLineups = useCallback(async (eventId) => {
    if (!eventId) return;
    try {
      const data = await cricketApi.getMatchLineups(eventId);
      const transformed = transformLineupsToSquad(data);
      setSquadData(transformed);
      // Cache players for search
      cacheLineupsPlayers(data);
    } catch (err) {
      console.warn('[HomeScreen] Lineups fetch failed:', err);
    }
  }, []);

  // Fetch timeline delta and match details for live updates
  const fetchTimelineAndDetails = useCallback(async (eventId) => {
    if (!eventId) return;
    try {
      const [delta, summaryData] = await Promise.all([
        cricketApi.getMatchTimelineDelta(eventId).catch(() => null),
        cricketApi.getMatchSummary(eventId).catch(() => null)
      ]);
      if (delta) {
        setTimelineData(delta);
      }
      if (summaryData) {
        setActiveMatchStats(transformLiveMatchStats(summaryData));
      }
    } catch (err) {
      console.warn('[HomeScreen] Timeline and Summary fetch failed:', err);
    }
  }, []);

  // Initial data load
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const live = await fetchLiveSchedule();
        await fetchDailySchedule();

        // If we have a live match, fetch its lineups
        if (live.length > 0) {
          await fetchLineups(live[0].id);
        }
      } catch (err) {
        setError('Failed to load matches. Using cached data.');
        console.error('[HomeScreen] Load error:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Live polling — every 30 seconds for live matches
  useEffect(() => {
    if (selectedEventId && liveMatches.length > 0) {
      pollingRef.current = setInterval(() => {
        fetchLiveSchedule();
        fetchTimelineAndDetails(selectedEventId);
      }, 10000);
    }
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, [selectedEventId, liveMatches.length, fetchTimelineAndDetails]);

  // When selected event changes, refresh lineups and specifics
  useEffect(() => {
    if (selectedEventId) {
      fetchLineups(selectedEventId);
      fetchTimelineAndDetails(selectedEventId);
    }
  }, [selectedEventId, fetchTimelineAndDetails]);

  // Determine current match list
  const getCurrentMatchList = () => {
    if (activeMatchTab === 0 && liveMatches.length > 0) {
      return liveMatches;
    } else if (activeMatchTab === 1 && completedMatches.length > 0) {
      return completedMatches;
    } else if (activeMatchTab === 2 && upcomingMatches.length > 0) {
      return upcomingMatches;
    }
    // Fallback to mock data with at least one element array
    return [
      activeMatchTab === 0
        ? mockMatchData.liveMatch
        : activeMatchTab === 1
        ? mockMatchData.completedMatch
        : mockMatchData.upcomingMatch
    ];
  };

  const currentMatches = getCurrentMatchList();
  const match = currentMatches.find(m => m.id === selectedEventId) || currentMatches[0];

  const handleMatchScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    if (currentMatches[roundIndex] && currentMatches[roundIndex].id !== selectedEventId) {
      setSelectedEventId(currentMatches[roundIndex].id);
    }
  };

  // Get bowler/batsmen data from timeline delta if available
  const getLatestBallData = () => {
    const latest = timelineData?.timeline?.[timelineData.timeline.length - 1];
    if (!latest) return null;
    return {
      striker: latest?.batting_params?.striker,
      bowler: latest?.bowling_params?.bowler,
      commentary: latest?.commentary?.text,
      zone: latest?.batting_params?.zone_played_in,
      angle: latest?.batting_params?.angle_traversed,
    };
  };

  const renderBallByBall = () => {
    const { godsEyeData, batsmenData: realBatsmen, bowlerData: realBowler } = activeMatchStats || {};

    const bowlerData = realBowler || {
      name: 'M. Jansen',
      o: '2.1',
      r: '24',
      w: '0',
      zeros: 2,
      fours: 4,
      sixes: 1,
      ex: 1,
      ss: '3°',
      pace: '137 km/h',
      impact: 55,
    };

    const batsmenData = realBatsmen?.length > 0 ? realBatsmen : [
      { name: 'H. Pandya', r: 57, b: 27, fours: 3, sixes: 1, impact: 87, impactColor: '#52B4F5' },
      { name: 'T. Varma', r: 24, b: 8, fours: 1, sixes: 0, impact: 67, impactColor: '#52B4F5' },
    ];

    const latestBall = getLatestBallData();
    const { manhattan, worm } = activeMatchStats || {};

    return (
    <>
      <GodsEyeView
        data={{ ...(godsEyeData || godsEyeView), timing: '73%', control: '87%', latestBall }}
        onActionPress={(action) => {
          const eid = selectedEventId || match?.id;
          if (action === 'Wagon Wheel') {
            navigation.navigate('WagonWheel', { eventId: eid });
          }
          if (action === 'Line/Length') {
            navigation.navigate('LineAndLengthScreen', { eventId: eid });
          }
          if (action === 'Playing XI') setActiveContentTab(1);
          if (action === 'Pitch Report') {
            navigation.navigate('StadiumDetail', { eventId: eid });
          }
          if (action === 'ScoreCard') {
            navigation.navigate('ScoreCard', { eventId: eid });
          }
          if (action === 'Past Overs') {
            navigation.navigate('PastOvers', { eventId: eid, matchTitle: match?.matchInfo });
          }
        }}
      />
      <Timeline 
        data={{ 
          currentOver: match?.overs || '0.0',
          totalOvers: '20',
          rr: match?.rrr && match?.rrr !== '0.0' ? match.rrr : match?.rr || '0.0',
          manhattan,
          worm 
        }} 
      />

      <ImpactMetrics type="bowler" data={bowlerData} />
      <ImpactMetrics type="batsmen" data={batsmenData} />

      <View style={{ marginTop: spacing.lg }}>
        <PlayerCard
          player={{
            id: bowlerData.playerId || '1',
            name: bowlerData.name,
            role: 'Bowler',
            country: bowlerData.country || '🌍',
            stats: [
              { label: 'Economy', value: String(bowlerData.ex || '0') },
              { label: 'Wickets', value: String(bowlerData.w || '0') },
              { label: 'Overs', value: String(bowlerData.o || '0') },
            ],
            xStats: [
              { label: 'Runs', value: String(bowlerData.r || '0') },
              { label: 'Dots', value: String(bowlerData.zeros || '0') },
              { label: 'Maidens', value: String(bowlerData.m || '0') },
            ],
          }}
          onSeeMetrics={() => {
            const playerParam = typeof playersData !== 'undefined' && bowlerData.name.includes('Muzarabani') 
              ? playersData.marcoJansen // fallback if no active player profile map
              : { id: bowlerData.playerId, name: bowlerData.name };
            navigation.navigate('PlayerStats', { player: playerParam, eventId: selectedEventId || match?.id });
          }}
        />
      </View>
    </>
  );
};

  const renderPlayerXI = () => {
    // Use API squad data if available, else mock
    const squad = squadData || {
      india: mockSquadData.india,
      southafrica: mockSquadData.southAfrica,
    };
    const teamKeys = Object.keys(squad);

    return (
      <View style={styles.playingXI}>
        <View style={styles.squadContainer}>
          {teamKeys.map((key, idx) => (
            <View key={key} style={styles.squadColumn}>
              <View style={styles.squadHeader}>
                <Text style={styles.squadFlag}>{squad[key].flag}</Text>
                <Text style={styles.squadTeamName}>{squad[key].name}</Text>
              </View>
              {squad[key].players.map((player, i) => (
                <View key={i} style={styles.squadPlayer}>
                  <View style={styles.squadPlayerDot} />
                  <Text style={styles.squadPlayerName}>
                    {typeof player === 'string' ? player : player.name}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
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
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary || '#3B82F6'} />
            <Text style={styles.loadingText}>Loading matches...</Text>
          </View>
        ) : (
          <>
            {error && (
              <View style={styles.errorBanner}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {/* Swipeable Match Cards */}
            <View style={styles.carouselContainer}>
              <FlatList
                data={currentMatches}
                keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleMatchScroll}
                renderItem={({ item }) => (
                  <View style={{ width: SCREEN_WIDTH }}>
                    <MatchHeader 
                      match={item} 
                      onPress={() => navigation.navigate('ScoreCard', { 
                        eventId: item.id,
                        matchTitle: item.matchInfo
                      })}
                    />
                  </View>
                )}
              />
              {currentMatches.length > 1 && (
                <View style={styles.paginationDots}>
                  {currentMatches.map((m, i) => (
                    <View
                      key={m.id || i}
                      style={[
                        styles.dot,
                        (m.id === match?.id || (!m.id && i === 0)) && styles.dotActive
                      ]}
                    />
                  ))}
                </View>
              )}
            </View>

            <TabSelector
              tabs={[
                `Live${liveMatches.length > 0 ? ` (${liveMatches.length})` : ''}`,
                `Completed${completedMatches.length > 0 ? ` (${completedMatches.length})` : ''}`,
                `Upcoming${upcomingMatches.length > 0 ? ` (${upcomingMatches.length})` : ''}`,
              ]}
              activeTab={activeMatchTab}
              onTabChange={(idx) => {
                setActiveMatchTab(idx);
                // Update selected event ID
                const matchList = idx === 0 ? liveMatches : idx === 1 ? completedMatches : upcomingMatches;
                if (matchList.length > 0) {
                  setSelectedEventId(matchList[0].id);
                }
              }}
              style={styles.matchTabs}
            />

            <TabSelector
              tabs={['Ball by Ball', 'PlayerXI']}
              activeTab={activeContentTab}
              onTabChange={setActiveContentTab}
            />

            {activeContentTab === 0 ? renderBallByBall() : renderPlayerXI()}
          </>
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
  carouselContainer: {
    marginBottom: spacing.sm,
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  dotActive: {
    width: 16,
    backgroundColor: colors.primary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  matchTabs: {
    marginVertical: spacing.sm,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    color: '#CCCCCC',
    fontSize: 14,
    marginTop: 12,
  },
  errorBanner: {
    backgroundColor: 'rgba(230, 57, 70, 0.15)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(230, 57, 70, 0.3)',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    textAlign: 'center',
  },
  playingXI: {
    paddingTop: spacing.lg,
  },
  squadContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.screenPaddingH,
    gap: spacing.xl,
    backgroundColor: '#141521',
    marginHorizontal: spacing.screenPaddingH,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  squadColumn: {
    flex: 1,
  },
  squadHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  squadFlag: {
    fontSize: 18,
  },
  squadTeamName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  squadPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    gap: 10,
  },
  squadPlayerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  squadPlayerName: {
    color: '#CCCCCC',
    fontSize: 12,
  },
});

export default HomeScreen;
