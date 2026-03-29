import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

const LineAndLength = ({ data }) => {
  const lengthLabels = ['Full toss', 'Yorker', 'Slot', 'Length', 'Short', 'Half Way'];
  
  const deliveries = [
    { x: 60, y: 15, type: 'run' },
    { x: 65, y: 20, type: 'run' },
    { x: 55, y: 30, type: 'four' },
    { x: 60, y: 35, type: 'wicket' },
    { x: 70, y: 40, type: 'run' },
    { x: 50, y: 42, type: 'four' },
    { x: 65, y: 50, type: 'run' },
    { x: 60, y: 55, type: 'run' },
    { x: 55, y: 65, type: 'six' },
    { x: 60, y: 75, type: 'run' },
    { x: 55, y: 82, type: 'run' },
  ];

  return (
    <View style={styles.container}>
      {/* Score info */}
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>
          {data?.overs || '0'} <Text style={styles.scoreSecondary}>
            - {data?.wickets || 0}
          </Text>
        </Text>
        <Text style={styles.divider}> | </Text>
        <Text style={styles.scoreDetail}>
          {data?.fours || 0} (4s) - {data?.sixes || 0} (6s)
        </Text>
        
        {data?.batsmanType && (
          <View style={styles.batsmanTypes}>
            {data.batsmanType.map((type, i) => (
              <View key={i} style={[styles.typeBadge, i === 0 && styles.typeBadgeActive]}>
                <Text style={[styles.typeText, i === 0 && styles.typeTextActive]}>{type}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Metrics */}
      <View style={styles.metricsRow}>
        {data?.seamSwing && (
          <View style={styles.metricBadge}>
            <Text style={styles.metricText}>
              Seam/Swing: <Text style={styles.metricValue}>{data.seamSwing}</Text>
            </Text>
          </View>
        )}
        {data?.spin && (
          <View style={styles.metricBadge}>
            <Text style={styles.metricText}>
              Spin: <Text style={styles.metricValue}>{data.spin}</Text>
            </Text>
          </View>
        )}
        {data?.avgPace && (
          <View style={styles.metricBadge}>
            <Text style={styles.metricText}>
              Avge. Pace: <Text style={styles.metricValue}>{data.avgPace}</Text>
            </Text>
          </View>
        )}
        {data?.releasePoint && (
          <View style={styles.metricBadge}>
            <Text style={styles.metricText}>
              Release Point: <Text style={styles.metricValue}>{data.releasePoint}</Text>
            </Text>
          </View>
        )}
      </View>

      {/* Pitch visualization */}
      <View style={styles.pitchContainer}>
        {/* Circular background */}
        <View style={styles.pitchCircle}>
          {/* Length labels */}
          {lengthLabels.map((label, index) => (
            <View 
              key={index} 
              style={[
                styles.lengthLabel,
                { top: `${10 + index * 15}%` },
              ]}
            >
              <Text style={styles.lengthText}>{label}</Text>
            </View>
          ))}

          {/* Pitch strip */}
          <View style={styles.pitchStrip}>
            {/* Color bands */}
            <View style={[styles.pitchBand, { backgroundColor: 'rgba(59, 130, 246, 0.15)' }]} />
            <View style={[styles.pitchBand, { backgroundColor: 'rgba(59, 130, 246, 0.2)' }]} />
            <View style={[styles.pitchBand, { backgroundColor: 'rgba(59, 130, 246, 0.25)' }]} />
            <View style={[styles.pitchBand, { backgroundColor: 'rgba(59, 130, 246, 0.3)' }]} />
            <View style={[styles.pitchBand, { backgroundColor: 'rgba(59, 130, 246, 0.2)' }]} />
            <View style={[styles.pitchBand, { backgroundColor: 'rgba(59, 130, 246, 0.15)' }]} />
            
            {/* Stump graphic */}
            <View style={styles.stumps}>
              <View style={styles.stump} />
              <View style={styles.stump} />
              <View style={styles.stump} />
              <View style={styles.bail} />
            </View>

            {/* Delivery dots */}
            {deliveries.map((d, i) => (
              <View
                key={i}
                style={[
                  styles.deliveryDot,
                  {
                    left: `${d.x - 8}%`,
                    top: `${d.y}%`,
                    backgroundColor: d.type === 'wicket' ? colors.dotWicket :
                                     d.type === 'four' ? colors.dotFour :
                                     d.type === 'six' ? colors.dotSix :
                                     d.type === 'dot' ? colors.dotZero : colors.dotRun,
                  },
                ]}
              />
            ))}
          </View>
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.dotWicket }]} />
          <Text style={styles.legendLabel}>W</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.dotZero }]} />
          <Text style={styles.legendLabel}>0</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.dotRun }]} />
          <Text style={styles.legendLabel}>1,2,3</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.dotFour }]} />
          <Text style={styles.legendLabel}>4s</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.dotSix }]} />
          <Text style={styles.legendLabel}>6s</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.screenPaddingH,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: spacing.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  score: {
    color: colors.textPrimary,
    ...typography.scoreMedium,
  },
  scoreSecondary: {
    color: colors.textSecondary,
  },
  divider: {
    color: colors.textMuted,
    marginHorizontal: spacing.sm,
  },
  scoreDetail: {
    color: colors.textSecondary,
    ...typography.body,
  },
  batsmanTypes: {
    flexDirection: 'row',
    marginLeft: spacing.md,
    gap: spacing.xs,
  },
  typeBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 4,
    backgroundColor: colors.cardBackgroundLight,
    borderWidth: 1,
    borderColor: colors.border,
  },
  typeBadgeActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeText: {
    color: colors.textSecondary,
    ...typography.labelSmall,
  },
  typeTextActive: {
    color: colors.white,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  metricBadge: {
    backgroundColor: colors.cardBackground,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  metricText: {
    color: colors.textSecondary,
    ...typography.bodySmall,
  },
  metricValue: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
  pitchContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  pitchCircle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 24, 41, 0.8)',
    position: 'relative',
  },
  lengthLabel: {
    position: 'absolute',
    left: 10,
    zIndex: 10,
  },
  lengthText: {
    color: colors.textSecondary,
    ...typography.caption,
  },
  pitchStrip: {
    width: 80,
    height: 250,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 4,
    position: 'relative',
    overflow: 'visible',
  },
  pitchBand: {
    flex: 1,
  },
  stumps: {
    position: 'absolute',
    top: -5,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 3,
    alignItems: 'flex-end',
  },
  stump: {
    width: 2,
    height: 18,
    backgroundColor: colors.textSecondary,
  },
  bail: {
    position: 'absolute',
    top: 0,
    left: -2,
    right: -2,
    height: 2,
    backgroundColor: colors.textSecondary,
    borderRadius: 1,
  },
  deliveryDot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  legend: {
    flexDirection: 'row',
    gap: spacing.xl,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendLabel: {
    color: colors.textSecondary,
    ...typography.bodySmall,
  },
});

export default LineAndLength;
