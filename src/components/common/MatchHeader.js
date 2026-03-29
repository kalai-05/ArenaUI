import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

const MatchHeader = ({ match }) => {
  const {
    team1 = {},
    team2 = {},
    matchInfo = '',
    status = 'upcoming',
    statusText = '',
    result = '',
  } = match || {};

  const renderFormDots = (form, alignRight = false) => (
    <View style={[styles.formRow, alignRight && styles.formRowRight]}>
      {form?.map((ball, i) => {
        let dotColor = '#9CA3AF'; // Gray for dot
        if (ball === 'W') dotColor = '#E63946'; // Red
        if (['1', '2', '3', '4', '6'].includes(ball)) dotColor = '#468256'; // Green
        
        return <View key={i} style={[styles.formDot, { backgroundColor: dotColor }]} />;
      })}
    </View>
  );

  const getStatusBadgeStyles = () => {
    switch (status) {
      case 'live':
        return {
          bg: 'rgba(230, 57, 70, 0.1)',
          border: '#892c33',
          text: '#ffffff',
        };
      case 'completed':
        return {
          bg: 'rgba(70, 130, 86, 0.1)',
          border: '#438051',
          text: '#ffffff',
        };
      default:
        return {
          bg: '#3B82F6',
          border: '#3B82F6',
          text: '#ffffff',
        };
    }
  };

  const badgeStyles = getStatusBadgeStyles();

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {/* Gradient Background using SVG */}
        <View style={StyleSheet.absoluteFill}>
          <Svg height="100%" width="100%">
            <Defs>
              <SvgGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor="#151621" stopOpacity="1" />
                <Stop offset="100%" stopColor="#2E294E" stopOpacity="1" />
              </SvgGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#grad)" rx="16" ry="16" />
          </Svg>
        </View>

        {/* Top Match Info */}
        <View style={styles.topInfo}>
          <Text style={styles.matchInfoText}>{matchInfo}</Text>
        </View>

        {/* Content Row */}
        <View style={styles.contentRow}>
          {/* Team 1 */}
          <View style={styles.teamSection}>
            <View style={styles.flagScoreRow}>
              <View style={styles.flagContainer}>
                <Text style={styles.flagEmoji}>{team1.flag || '🏏'}</Text>
              </View>
              <View style={styles.scoreCol}>
                <Text style={styles.teamCode}>{team1.code}</Text>
                <View style={styles.scoreRow}>
                  <Text style={styles.scoreMain}>{team1.score?.split('/')[0]}</Text>
                  <Text style={styles.scoreDivider}>/</Text>
                  <Text style={styles.scoreSmall}>{team1.score?.split('/')[1]}</Text>
                </View>
                <Text style={styles.oversText}>({team1.overs})</Text>
              </View>
            </View>
            {renderFormDots(team1.form)}
          </View>

          {/* Status Badge */}
          <View style={[
            styles.statusBadge, 
            { backgroundColor: badgeStyles.bg, borderColor: badgeStyles.border }
          ]}>
            <Text style={[styles.statusTabText, { color: badgeStyles.text }]}>
              {statusText || status}
            </Text>
          </View>

          {/* Team 2 */}
          <View style={styles.teamSection}>
            <View style={[styles.flagScoreRow, styles.flagScoreRowReverse]}>
              <View style={[styles.flagContainer, styles.flagContainerRight]}>
                <Text style={styles.flagEmoji}>{team2.flag || '🏏'}</Text>
              </View>
              <View style={[styles.scoreCol, styles.scoreColRight]}>
                <Text style={[styles.teamCode, styles.textRight]}>{team2.code}</Text>
                <View style={[styles.scoreRow, styles.scoreRowRight]}>
                  <Text style={styles.scoreMain}>{team2.score?.split('/')[0]}</Text>
                  <Text style={styles.scoreDivider}>/</Text>
                  <Text style={styles.scoreSmall}>{team2.score?.split('/')[1]}</Text>
                </View>
                <Text style={[styles.oversText, styles.textRight]}>({team2.overs})</Text>
              </View>
            </View>
            {renderFormDots(team2.form, true)}
          </View>
        </View>
      </View>

      {/* Footer Info Band */}
      {result ? (
        <View style={styles.footerBand}>
          <Text style={styles.footerText}>{result}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    marginHorizontal: spacing.screenPaddingH,
    marginVertical: spacing.sm,
    borderRadius: 16,
    overflow: 'hidden',
  },
  container: {
    height: 120, // Main card height as per Figma content
    paddingHorizontal: spacing.lg,
    zIndex: 1,
  },
  topInfo: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  matchInfoText: {
    color: '#CCCCCC',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'System', // Fallback for Plus Jakarta Sans
  },
  contentRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.xs,
  },
  teamSection: {
    flex: 1,
  },
  flagScoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  flagScoreRowReverse: {
    flexDirection: 'row-reverse',
  },
  flagContainer: {
    width: 36,
    height: 24,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagEmoji: {
    fontSize: 18,
  },
  scoreCol: {
    flex: 1,
  },
  scoreColRight: {
    alignItems: 'flex-end',
  },
  teamCode: {
    color: '#CCCCCC',
    fontSize: 12,
    marginBottom: 2,
  },
  textRight: {
    textAlign: 'right',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  scoreRowRight: {
    justifyContent: 'flex-end',
  },
  scoreMain: {
    color: '#F0F6FC',
    fontSize: 20,
    fontWeight: '800', // Barlow ExtraBold
  },
  scoreDivider: {
    color: '#F0F6FC',
    fontSize: 18,
    marginHorizontal: 1,
  },
  scoreSmall: {
    color: '#F0F6FC',
    fontSize: 18,
    fontWeight: '500', // Barlow Medium
  },
  oversText: {
    color: '#CCCCCC',
    fontSize: 12,
  },
  formRow: {
    flexDirection: 'row',
    marginTop: spacing.sm,
    gap: 4,
  },
  formRowRight: {
    justifyContent: 'flex-end',
  },
  formDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 100,
    borderWidth: 1,
    marginHorizontal: spacing.sm,
    minWidth: 66,
    alignItems: 'center',
  },
  statusTabText: {
    fontSize: 12,
    fontWeight: '500',
  },
  footerBand: {
    backgroundColor: '#332D5A', // The purple-blue footer band
    paddingVertical: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -2, // Slight overlap for smooth transition
  },
  footerText: {
    color: '#F2F2F2',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
});

export default MatchHeader;
