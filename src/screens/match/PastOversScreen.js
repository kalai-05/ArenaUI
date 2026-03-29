import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList, ActivityIndicator } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';
import Header from '../../components/common/Header';
import { cricketApi } from '../../services/api';
import { transformTimelineToPastOvers } from '../../services/dataTransformers';
import { pastOversData as mockPastOversData } from '../../data/mockData';

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

const PastOversScreen = ({ navigation, route }) => {
  const eventId = route?.params?.eventId;
  const matchTitle = route?.params?.matchTitle || 'India vs South Africa 5th iT20';

  const [pastOversData, setPastOversData] = useState(mockPastOversData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!eventId) return;

    const fetchTimeline = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await cricketApi.getMatchTimeline(eventId);
        const transformed = transformTimelineToPastOvers(data);
        if (transformed.length > 0) {
          setPastOversData(transformed);
        } else {
          setError('No over data available yet');
        }
      } catch (err) {
        console.warn('[PastOvers] Timeline fetch failed:', err);
        setError('Using cached data');
      } finally {
        setLoading(false);
      }
    };
    fetchTimeline();
  }, [eventId]);

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
      {/* Commentary (from API) */}
      {item.commentary && item.commentary.length > 0 && (
        <View style={styles.commentaryContainer}>
          {item.commentary.slice(0, 2).map((text, i) => (
            <Text key={i} style={styles.commentaryText} numberOfLines={2}>
              {text}
            </Text>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <Header
        title={matchTitle}
        showBack
        onBackPress={() => navigation.goBack()}
      />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text style={styles.loadingText}>Loading overs data...</Text>
        </View>
      ) : (
        <>
          {error && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          <FlatList
            data={pastOversData}
            keyExtractor={(item) => `over-${item.over}`}
            renderItem={renderOverItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
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
    marginBottom: 4,
    borderRadius: 6,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 11,
    textAlign: 'center',
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
  commentaryContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  commentaryText: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 4,
  },
});

export default PastOversScreen;
