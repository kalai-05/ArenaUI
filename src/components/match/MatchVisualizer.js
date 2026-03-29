import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Rect, Path, Circle, G, Line, Text as SvgText } from 'react-native-svg';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 32;
const CHART_HEIGHT = 160;

const MatchVisualizer = ({ type = 'manhattan', data }) => {
  const renderManhattan = () => {
    // Use data.manhattan if available, else fallback
    const bars = data?.manhattan || [
      { r: 2, t: 'dot' }, { r: 6, t: 'six' }, { r: 1, t: 'one' }, 
      { r: 12, t: 'four' }, { r: 0, t: 'dot' }, { r: 4, t: 'four' },
      { r: 1, t: 'one' }, { r: 1, t: 'one' }, { r: 8, t: 'four' },
      { r: 4, t: 'four' }, { r: 15, t: 'six' }, { r: 6, t: 'six' }
    ];

    const barWidth = Math.max(8, (CHART_WIDTH - 40) / Math.max(bars.length, 12) - 4);
    const barGap = 4;

    return (
      <View style={styles.chartWrapper}>
        <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <Line
              key={i}
              x1="0"
              y1={(CHART_HEIGHT / 4) * i}
              x2={CHART_WIDTH}
              y2={(CHART_HEIGHT / 4) * i}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          ))}

          {/* Bars */}
          {bars.map((bar, i) => {
            const barHeight = Math.min(CHART_HEIGHT - 20, bar.r * 6);
            const x = 20 + i * (barWidth + barGap);
            const y = CHART_HEIGHT - barHeight;

            return (
              <G key={i}>
                <Rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    fill={bar.w > 0 ? '#E63946' : bar.r >= 6 ? '#52B4F5' : bar.r >= 4 ? '#8E5FEC' : '#1E1B2E'}
                    rx="2"
                />
                {bar.r > 0 && (
                  <SvgText
                    x={x + barWidth / 2}
                    y={y - 6}
                    fill="#CCCCCC"
                    fontSize="8"
                    textAnchor="middle"
                  >
                    {bar.r}
                  </SvgText>
                )}
              </G>
            );
          })}
        </Svg>
      </View>
    );
  };

  const renderWorm = () => {
    const wormData = data?.worm || { team1: [], team2: [] };
    
    const renderLine = (points, color) => {
        if (!points || points.length === 0) return null;
        const xStep = (CHART_WIDTH - 40) / (points.length > 1 ? points.length - 1 : 1);
        let d = `M 20 ${CHART_HEIGHT - 20}`;
        points.forEach((p, i) => {
            const x = 20 + i * xStep;
            const y = CHART_HEIGHT - 20 - (p.runs * 0.5); // scaling
            d += ` L ${x} ${y}`;
        });
        return (
            <Path
              d={d}
              fill="none"
              stroke={color}
              strokeWidth="2"
            />
        );
    };

    return (
      <View style={styles.chartWrapper}>
        <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
          {[0, 1, 2, 3, 4].map((i) => (
            <Line key={i} x1="0" y1={(CHART_HEIGHT / 4) * i} x2={CHART_WIDTH} y2={(CHART_HEIGHT / 4) * i} stroke="rgba(255,255,255,0.05)" />
          ))}

          {renderLine(wormData.team1, '#8E5FEC')}
          {renderLine(wormData.team2, '#52B4F5')}
        </Svg>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Chart Content */}
      {type === 'manhattan' ? renderManhattan() : renderWorm()}

      {/* Badges Row */}
      <View style={styles.metricsRow}>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>Pressure</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: '89%', backgroundColor: '#8E5FEC' }]} />
            <Text style={styles.percentageText}>89%</Text>
          </View>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>Momentum</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: '75%', backgroundColor: '#52B4F5' }]} />
            <Text style={styles.percentageText}>75%</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.screenPaddingH,
    marginBottom: spacing.lg,
  },
  chartWrapper: {
    backgroundColor: '#141521',
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    minHeight: CHART_HEIGHT + 40,
  },
  barLabel: {
    position: 'absolute',
    color: '#CCCCCC',
    fontSize: 10,
    width: 20,
    textAlign: 'center',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  metricItem: {
    flex: 1,
    backgroundColor: '#1E1B2E',
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metricLabel: {
    color: '#CCCCCC',
    fontSize: 12,
  },
  progressBarContainer: {
    flex: 1,
    height: 18,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 9,
    marginHorizontal: 8,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  progressBar: {
    height: '100%',
    borderRadius: 9,
  },
  percentageText: {
    position: 'absolute',
    right: 8,
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});

export default MatchVisualizer;
