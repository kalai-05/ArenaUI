import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';

const PlayerCard = ({ player, onPress, onSeeMetrics }) => {
  const {
    name = '',
    role = '',
    image,
    country,
    stats = [],
    xStats = [],
  } = player || {};

  // Split name for Figma's multi-line Barlow Bold look
  const nameParts = name.split('\n');

  return (
    <View style={styles.outerContainer}>
      {/* Background Glow */}
      <View style={styles.glowLayer} />
      
      <TouchableOpacity 
        style={styles.container}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View style={styles.content}>
          {/* Top Section: Photo, Name, Flag */}
          <View style={styles.header}>
            <View style={styles.playerInfoRow}>
              <View style={styles.imageWrapper}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.playerImage} />
                ) : (
                  <View style={styles.placeholderImage}>
                    <Text style={styles.placeholderText}>{name.charAt(0)}</Text>
                  </View>
                )}
              </View>
              <View style={styles.nameWrapper}>
                <Text style={styles.playerName}>
                  {name}
                </Text>
                <Text style={styles.playerRole}>{role}</Text>
              </View>
            </View>
            <View style={styles.flagWrapper}>
               <Text style={styles.flagEmoji}>{country || '🏏'}</Text>
            </View>
          </View>

          {/* Stats Table */}
          <View style={styles.statsTable}>
            <View style={styles.statsRow}>
              {stats.map((stat, i) => (
                <View key={`stat-${i}`} style={styles.statCol}>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                  <Text style={styles.statValue}>{stat.value}</Text>
                </View>
              ))}
            </View>
            <View style={[styles.statsRow, { marginTop: 12 }]}>
              {xStats.map((stat, i) => (
                <View key={`xstat-${i}`} style={styles.statCol}>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                  <Text style={styles.statValue}>{stat.value}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Bottom Action */}
          <View style={styles.footer}>
            <TouchableOpacity onPress={onSeeMetrics} disabled={!onSeeMetrics}>
              <Text style={styles.metricsLinkText}>See Arena Metrics</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    marginHorizontal: spacing.screenPaddingH,
    marginBottom: spacing.xl,
    position: 'relative',
    paddingTop: 10,
  },
  glowLayer: {
    position: 'absolute',
    top: 20,
    left: 10,
    right: 10,
    height: 40,
    backgroundColor: 'rgba(157, 76, 240, 0.4)',
    borderRadius: 16,
    blur: 20, // Only works on iOS/some platforms, so we use opacity
  },
  container: {
    backgroundColor: 'rgba(18, 24, 33, 0.85)',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  playerInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#1E1B2E',
    overflow: 'hidden',
    marginRight: 16,
  },
  playerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
  },
  nameWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  playerName: {
    color: '#F0F6FC',
    fontSize: 28,
    fontWeight: '700', // Barlow Bold simulation
    lineHeight: 32,
  },
  playerRole: {
    color: '#B3B3B3',
    fontSize: 14,
    marginTop: 4,
  },
  flagWrapper: {
    width: 40,
    height: 28,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagEmoji: {
    fontSize: 20,
  },
  statsTable: {
    backgroundColor: '#161D27',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCol: {
    flex: 1,
    alignItems: 'flex-start',
  },
  statLabel: {
    color: '#CCCCCC',
    fontSize: 10,
    marginBottom: 4,
  },
  statValue: {
    color: '#F0F6FC',
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 4,
  },
  metricsLinkText: {
    color: '#52B4F5',
    fontSize: 12,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});

export default PlayerCard;
