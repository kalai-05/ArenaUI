import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';

const ImpactMetrics = ({ type = 'bowler', data }) => {
  const renderBowlerTable = () => (
    <View style={styles.tableContainer}>
      <View style={styles.headerRow}>
        <Text style={[styles.headerText, { flex: 2 }]}>Bowler</Text>
        <Text style={styles.headerText}>O</Text>
        <Text style={styles.headerText}>R</Text>
        <Text style={styles.headerText}>W</Text>
        <Text style={styles.headerText}>0s</Text>
        <Text style={styles.headerText}>4s</Text>
        <Text style={styles.headerText}>6s</Text>
        <Text style={styles.headerText}>Ex</Text>
        <Text style={styles.headerText}>S/S</Text>
        <Text style={styles.headerText}>Pace</Text>
      </View>
      <View style={styles.dataRow}>
        <Text style={[styles.dataTextMain, { flex: 2 }]}>{data.name}</Text>
        <Text style={styles.dataText}>{data.o}</Text>
        <Text style={styles.dataText}>{data.r}</Text>
        <Text style={styles.dataText}>{data.w}</Text>
        <Text style={styles.dataText}>{data.zeros || 0}</Text>
        <Text style={styles.dataText}>{data.fours || 0}</Text>
        <Text style={styles.dataText}>{data.sixes || 0}</Text>
        <Text style={styles.dataText}>{data.ex || 0}</Text>
        <Text style={styles.dataText}>{data.ss || '0°'}</Text>
        <Text style={styles.dataText}>{data.pace || '-'}</Text>
      </View>
      <View style={styles.impactContainer}>
        <View style={styles.impactBarWrapper}>
          <View style={[styles.impactFill, { width: `${data.impact || 0}%`, backgroundColor: '#8E5FEC' }]} />
          <Text style={styles.impactLabel}>Impact {data.impact || 0}%</Text>
        </View>
      </View>
    </View>
  );

  const renderBatsmenTable = () => (
    <View style={styles.tableContainer}>
      <Text style={styles.sectionHeader}>Batsmen</Text>
      <View style={styles.batsmenRow}>
        {data.map((batsman, index) => (
          <View key={index} style={styles.batsmanCol}>
            <Text style={styles.batsmanName}>{batsman.name}</Text>
            <View style={styles.batsmanScoreRow}>
              <Text style={styles.batsmanScore}>{batsman.r}</Text>
              <Text style={styles.batsmanBalls}>({batsman.b})</Text>
              <Text style={styles.batsmanOthers}>{batsman.fours} (4s) - {batsman.sixes} (6s)</Text>
            </View>
            <View style={styles.impactBarWrapperSmall}>
              <View style={[styles.impactFill, { width: `${batsman.impact || 0}%`, backgroundColor: batsman.impactColor || '#52B4F5' }]} />
              <Text style={styles.impactLabel}>Impact {batsman.impact || 0}%</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {type === 'bowler' ? renderBowlerTable() : renderBatsmenTable()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141521',
    borderRadius: 16,
    marginHorizontal: spacing.screenPaddingH,
    marginBottom: spacing.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  tableContainer: {
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    paddingBottom: 8,
    marginBottom: 8,
  },
  headerText: {
    flex: 1,
    color: '#CCCCCC',
    fontSize: 10,
    textAlign: 'center',
    fontWeight: '400',
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dataTextMain: {
    color: '#8E5FEC',
    fontSize: 12,
    fontWeight: '700',
  },
  dataText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '400',
  },
  sectionHeader: {
    color: '#CCCCCC',
    fontSize: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    paddingBottom: 4,
  },
  batsmenRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  batsmanCol: {
    flex: 1,
  },
  batsmanName: {
    color: '#52B4F5',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  batsmanScoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginBottom: 8,
  },
  batsmanScore: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  batsmanBalls: {
    color: '#CCCCCC',
    fontSize: 10,
  },
  batsmanOthers: {
    color: '#9CA3AF',
    fontSize: 9,
    flex: 1,
    textAlign: 'right',
  },
  impactContainer: {
    marginTop: 8,
  },
  impactBarWrapper: {
    height: 24,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  impactBarWrapperSmall: {
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  impactFill: {
    position: 'absolute',
    height: '100%',
    left: 0,
    borderRadius: 12,
    opacity: 0.8,
  },
  impactLabel: {
    position: 'absolute',
    left: 12,
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default ImpactMetrics;
