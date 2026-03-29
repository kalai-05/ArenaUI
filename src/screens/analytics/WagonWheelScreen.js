import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, ActivityIndicator } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';
import Header from '../../components/common/Header';
import Dropdown from '../../components/common/Dropdown';
import WagonWheelComponent from '../../components/match/WagonWheel';
import { cricketApi } from '../../services/api';
import { hasAdvancedCoverage } from '../../services/api';
import { transformTimelineToWagonWheel } from '../../services/dataTransformers';
import { wagonWheelData as mockWagonWheelData } from '../../data/mockData';

const WagonWheelScreen = ({ navigation, route }) => {
  const eventId = route?.params?.eventId;

  // State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noAdvancedCoverage, setNoAdvancedCoverage] = useState(false);
  const [timelineResponse, setTimelineResponse] = useState(null);
  const [batsmen, setBatsmen] = useState([]);
  const [selectedBatsmanId, setSelectedBatsmanId] = useState(null);
  const [shotData, setShotData] = useState([]);

  // Fallback mock data
  const mockBatsmen = Object.keys(mockWagonWheelData);
  const [selectedMockBatsman, setSelectedMockBatsman] = useState(mockBatsmen[0]);

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

        // Extract unique batsmen from timeline
        const timeline = data?.timeline || [];
        const batsmenMap = {};
        timeline.forEach(event => {
          if ((event.type === 'ball' || event.type === 'delivery') && event?.batting_params?.striker) {
            const striker = event.batting_params.striker;
            if (striker.id && !batsmenMap[striker.id]) {
              batsmenMap[striker.id] = {
                id: striker.id,
                name: striker.name || 'Unknown',
                runs: striker.runs_scored_so_far || 0,
              };
            }
            // Update runs
            if (striker.id && striker.runs_scored_so_far) {
              batsmenMap[striker.id].runs = striker.runs_scored_so_far;
            }
          }
        });

        const batsmenList = Object.values(batsmenMap);
        setBatsmen(batsmenList);

        if (batsmenList.length > 0) {
          setSelectedBatsmanId(batsmenList[0].id);
          const shots = transformTimelineToWagonWheel(data, batsmenList[0].id);
          setShotData(shots);
        }
      } catch (err) {
        console.warn('[WagonWheel] Timeline fetch failed:', err);
        setError('Using demo data');
      } finally {
        setLoading(false);
      }
    };
    fetchTimeline();
  }, [eventId]);

  // When selected batsman changes, recompute shot data
  useEffect(() => {
    if (selectedBatsmanId && timelineResponse) {
      const shots = transformTimelineToWagonWheel(timelineResponse, selectedBatsmanId);
      setShotData(shots);
    }
  }, [selectedBatsmanId, timelineResponse]);

  // Build display data for the component
  const getDisplayData = () => {
    if (!eventId || error || batsmen.length === 0) {
      // Fallback to mock
      return mockWagonWheelData[selectedMockBatsman];
    }

    const selectedBatsman = batsmen.find(b => b.id === selectedBatsmanId);
    const totalRuns = shotData.reduce((sum, s) => sum + s.runs, 0);
    const totalBalls = shotData.length;
    const fours = shotData.filter(s => s.runs === 4).length;
    const sixes = shotData.filter(s => s.runs === 6).length;

    return {
      batsman: selectedBatsman?.name || 'Unknown',
      score: String(totalRuns),
      balls: String(totalBalls),
      fours,
      sixes,
      timing: 'N/A',
      control: 'N/A',
      // Pass shot data for SVG plotting
      shots: shotData,
    };
  };

  // No advanced coverage message
  if (noAdvancedCoverage) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.background} />
        <Header title="Wagon Wheel" showBack onBackPress={() => navigation.goBack()} />
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataIcon}>📊</Text>
          <Text style={styles.noDataTitle}>Advanced Stats Not Available</Text>
          <Text style={styles.noDataText}>
            Wagon wheel data requires Core/Advanced coverage which is not available for this match.
          </Text>
        </View>
      </View>
    );
  }

  const data = getDisplayData();
  const isApiMode = eventId && !error && batsmen.length > 0;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <Header
        title="Wagon Wheel"
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
            <Text style={styles.loadingText}>Loading wagon wheel data...</Text>
          </View>
        ) : (
          <>
            {error && (
              <View style={styles.errorBanner}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <Text style={styles.sectionLabel}>Select Batsmen</Text>

            {isApiMode ? (
              <Dropdown
                selectedValue={batsmen.find(b => b.id === selectedBatsmanId)?.name || ''}
                options={batsmen.map(b => b.name)}
                onSelect={(selected) => {
                  const found = batsmen.find(b => b.name === selected);
                  if (found) setSelectedBatsmanId(found.id);
                }}
                style={styles.dropdown}
              />
            ) : (
              <Dropdown
                selectedValue={mockWagonWheelData[selectedMockBatsman]?.batsman || ''}
                options={Object.values(mockWagonWheelData).map(d => d.batsman)}
                onSelect={(selected) => {
                  const key = Object.keys(mockWagonWheelData).find(
                    k => mockWagonWheelData[k].batsman === selected
                  );
                  if (key) setSelectedMockBatsman(key);
                }}
                style={styles.dropdown}
              />
            )}

            <WagonWheelComponent data={data} />
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

export default WagonWheelScreen;
