import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import MatchVisualizer from './MatchVisualizer';

const Timeline = ({ data }) => {
  const [activeTab, setActiveTab] = useState('manhattan'); // manhattan, worm, etc.
  const { currentOver, totalOvers, rr } = data || {};

  return (
    <View style={styles.container}>
      {/* Over Header */}
      <View style={styles.overRow}>
        <Text style={styles.overLabel}>Over: </Text>
        <Text style={styles.overValue}>{currentOver}</Text>
        <Text style={styles.overTotal}>/{totalOvers}</Text>
      </View>

      {/* Control Header Row */}
      <View style={styles.controlRow}>
        <View style={styles.rrrBadge}>
          <Text style={styles.rrrText}>RRR: {rr}</Text>
        </View>

        <TouchableOpacity 
          style={styles.pastOversButton}
          onPress={() => setActiveTab('worm')}
        >
          <Text style={styles.controlText}>Past Overs</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.dropdownButton}
          onPress={() => setActiveTab('manhattan')}
        >
          <Text style={styles.controlText}>Ball by Ball</Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>
      </View>

      {/* Team Indicators */}
      <View style={styles.teamRow}>
        <View style={styles.teamBadge}>
          <View style={[styles.teamDot, { backgroundColor: '#8E5FEC' }]} />
          <Text style={styles.teamText}>SA</Text>
        </View>
        <View style={styles.teamBadge}>
          <View style={[styles.teamDot, { backgroundColor: '#52B4F5' }]} />
          <Text style={styles.teamText}>IND</Text>
        </View>
      </View>

      {/* The Chart component */}
      <MatchVisualizer type={activeTab} data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  overRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
    paddingBottom: spacing.sm,
  },
  overLabel: {
    color: '#CCCCCC',
    fontSize: 16,
    fontWeight: '700',
  },
  overValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  overTotal: {
    color: '#9CA3AF',
    fontSize: 16,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPaddingH,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  rrrBadge: {
    backgroundColor: '#1E1B2E',
    borderColor: '#3B82F6',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    flex: 1,
    alignItems: 'center',
  },
  rrrText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  pastOversButton: {
    backgroundColor: '#1E1B2E',
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    flex: 1,
    alignItems: 'center',
  },
  dropdownButton: {
    backgroundColor: '#1E1B2E',
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  controlText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  dropdownIcon: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  teamRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.screenPaddingH,
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  teamBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1B2E',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 6,
  },
  teamDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  teamText: {
    color: '#CCCCCC',
    fontSize: 11,
    fontWeight: '600',
  },
});

export default Timeline;
