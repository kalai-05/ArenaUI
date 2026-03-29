import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

const WagonWheel = ({ data }) => {
  return (
    <View style={styles.container}>
      {/* Score info */}
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>
          {data?.score || '0'} <Text style={styles.balls}>({data?.balls || '0'})</Text>
        </Text>
        <Text style={styles.divider}> | </Text>
        <Text style={styles.scoreDetail}>
          {data?.fours || 0} (4s) - {data?.sixes || 0} (6s)
        </Text>
      </View>

      {/* Timing & Control */}
      <View style={styles.metricsRow}>
        <View style={styles.metricBadge}>
          <Text style={styles.metricText}>Timing: <Text style={styles.metricValue}>{data?.timing || '0%'}</Text></Text>
        </View>
        <View style={styles.metricBadge}>
          <Text style={styles.metricText}>Control: <Text style={styles.metricValue}>{data?.control || '0%'}</Text></Text>
        </View>
      </View>

      {/* Wagon wheel visualization */}
      <View style={styles.wheelContainer}>
        {/* Outer ring */}
        <View style={styles.outerRing}>
          <View style={styles.middleRing}>
            <View style={styles.innerRing}>
              {/* Pitch */}
              <View style={styles.pitch}>
                <View style={styles.pitchDiamond} />
              </View>
            </View>
          </View>
        </View>
        
        {/* Shot lines */}
        {[
          { angle: -40, length: 0.3, type: 'run' },
          { angle: 15, length: 0.5, type: 'four' },
          { angle: 80, length: 0.7, type: 'six' },
          { angle: 140, length: 0.4, type: 'run' },
          { angle: -120, length: 0.45, type: 'run' },
        ].map((shot, i) => (
          <View
            key={i}
            style={[
              styles.shotLine,
              {
                transform: [
                  { rotate: `${shot.angle}deg` },
                  { scaleY: shot.length },
                ],
                backgroundColor: shot.type === 'six' ? colors.dotSix :
                                 shot.type === 'four' ? colors.dotFour : colors.dotRun,
              },
            ]}
          />
        ))}
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.dotRun }]} />
          <Text style={styles.legendText}>1,2,3</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.dotFour }]} />
          <Text style={styles.legendText}>4s</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.dotSix }]} />
          <Text style={styles.legendText}>6s</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
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
  },
  score: {
    color: colors.textPrimary,
    ...typography.scoreMedium,
  },
  balls: {
    color: colors.textSecondary,
    ...typography.body,
  },
  divider: {
    color: colors.textMuted,
    marginHorizontal: spacing.sm,
  },
  scoreDetail: {
    color: colors.textSecondary,
    ...typography.body,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
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
  wheelContainer: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  outerRing: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.05)',
  },
  middleRing: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.08)',
  },
  innerRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.12)',
  },
  pitch: {
    width: 30,
    height: 50,
    backgroundColor: colors.cardBackgroundLight,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pitchDiamond: {
    width: 10,
    height: 10,
    backgroundColor: colors.primary,
    transform: [{ rotate: '45deg' }],
  },
  shotLine: {
    position: 'absolute',
    width: 2,
    height: 100,
    opacity: 0.7,
  },
  legend: {
    flexDirection: 'row',
    gap: spacing.xl,
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
  legendText: {
    color: colors.textSecondary,
    ...typography.bodySmall,
  },
});

export default WagonWheel;
