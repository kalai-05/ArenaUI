import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, ActivityIndicator } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';
import Header from '../../components/common/Header';
import Dropdown from '../../components/common/Dropdown';
import LineAndLengthComponent from '../../components/match/LineAndLength';
import { cricketApi, hasAdvancedCoverage } from '../../services/api';
import { transformTimelineToLineAndLength } from '../../services/dataTransformers';
import { lineAndLengthData as mockLineAndLengthData } from '../../data/mockData';

const LineAndLengthScreen = ({ navigation, route }) => {
  const eventId = route?.params?.eventId;

  // State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noAdvancedCoverage, setNoAdvancedCoverage] = useState(false);
  const [timelineResponse, setTimelineResponse] = useState(null);
  const [bowlers, setBowlers] = useState([]);
  const [selectedBowlerId, setSelectedBowlerId] = useState(null);
  const [deliveryData, setDeliveryData] = useState([]);

  // Fallback mock
  const mockBowlers = Object.keys(mockLineAndLengthData);
  const [selectedMockBowler, setSelectedMockBowler] = useState(mockBowlers[0]);

  // Fetch timeline on mount
  useEffect(() => {
    if (!eventId) return;

    const fetchTimeline = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await cricketApi.getMatchTimeline(eventId);
        setTimelineResponse(data);

        // Check coverage level
        if (!hasAdvancedCoverage(data)) {
          setNoAdvancedCoverage(true);
          setLoading(false);
          return;
        }

        // Extract unique bowlers from timeline
        const timeline = data?.timeline || [];
        const bowlersMap = {};
        timeline.forEach(event => {
          if ((event.type === 'ball' || event.type === 'delivery') && event?.bowling_params?.bowler) {
            const bowler = event.bowling_params.bowler;
            if (bowler.id && !bowlersMap[bowler.id]) {
              bowlersMap[bowler.id] = {
                id: bowler.id,
                name: bowler.name || 'Unknown',
              };
            }
          }
        });

        const bowlersList = Object.values(bowlersMap);
        setBowlers(bowlersList);

        if (bowlersList.length > 0) {
          setSelectedBowlerId(bowlersList[0].id);
          const deliveries = transformTimelineToLineAndLength(data, bowlersList[0].id);
          setDeliveryData(deliveries);
        }
      } catch (err) {
        console.warn('[LineAndLength] Timeline fetch failed:', err);
        setError('Using demo data');
      } finally {
        setLoading(false);
      }
    };
    fetchTimeline();
  }, [eventId]);

  // When selected bowler changes, recompute delivery data
  useEffect(() => {
    if (selectedBowlerId && timelineResponse) {
      const deliveries = transformTimelineToLineAndLength(timelineResponse, selectedBowlerId);
      setDeliveryData(deliveries);
    }
  }, [selectedBowlerId, timelineResponse]);

  // Build display data
  const getDisplayData = () => {
    if (!eventId || error || bowlers.length === 0) {
      return mockLineAndLengthData[selectedMockBowler];
    }

    const selectedBowler = bowlers.find(b => b.id === selectedBowlerId);
    const wickets = deliveryData.filter(d => d.resultType === 'wicket').length;
    const boundaries = deliveryData.filter(d => d.resultType === 'boundary').length;
    const dots = deliveryData.filter(d => d.resultType === 'dot').length;
    const totalBalls = deliveryData.length;
    const overs = `${Math.floor(totalBalls / 6)}.${totalBalls % 6}`;

    return {
      bowler: selectedBowler?.name || 'Unknown',
      overs,
      wickets,
      fours: boundaries,
      sixes: 0,
      deliveries: deliveryData,
    };
  };

  // No advanced coverage
  if (noAdvancedCoverage) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.background} />
        <Header title="Line and Length" showBack onBackPress={() => navigation.goBack()} />
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataIcon}>📊</Text>
          <Text style={styles.noDataTitle}>Advanced Stats Not Available</Text>
          <Text style={styles.noDataText}>
            Line and length data requires Core/Advanced coverage which is not available for this match.
          </Text>
        </View>
      </View>
    );
  }

  const data = getDisplayData();
  const isApiMode = eventId && !error && bowlers.length > 0;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <Header
        title="Line and Length"
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text style={styles.loadingText}>Loading line & length data...</Text>
          </View>
        ) : (
          <>
            {error && (
              <View style={styles.errorBanner}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <Text style={styles.sectionLabel}>Select Bowler</Text>

            {isApiMode ? (
              <Dropdown
                selectedValue={bowlers.find(b => b.id === selectedBowlerId)?.name || ''}
                options={bowlers.map(b => b.name)}
                onSelect={(selected) => {
                  const found = bowlers.find(b => b.name === selected);
                  if (found) setSelectedBowlerId(found.id);
                }}
                style={styles.dropdown}
              />
            ) : (
              <Dropdown
                selectedValue={mockLineAndLengthData[selectedMockBowler]?.bowler || ''}
                options={Object.values(mockLineAndLengthData).map(d => d.bowler)}
                onSelect={(selected) => {
                  const key = Object.keys(mockLineAndLengthData).find(
                    k => mockLineAndLengthData[k].bowler === selected
                  );
                  if (key) setSelectedMockBowler(key);
                }}
                style={styles.dropdown}
              />
            )}

            <LineAndLengthComponent data={data} />
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
  scrollContent: {
    paddingBottom: spacing.huge,
  },
  sectionLabel: {
    color: colors.textPrimary,
    ...typography.label,
    paddingHorizontal: spacing.screenPaddingH,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  dropdown: {
    paddingHorizontal: spacing.screenPaddingH,
  },
  loadingContainer: {
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
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  noDataIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  noDataTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  noDataText: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default LineAndLengthScreen;
