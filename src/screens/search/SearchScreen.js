import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, StatusBar, TextInput,
  FlatList, TouchableOpacity,
} from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';
import Header from '../../components/common/Header';
import { searchCachedPlayers, getAllCachedPlayers } from '../../services/playerCache';
import { searchPlayers as mockSearchPlayers, playersData } from '../../data/mockData';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [cachedPlayerCount, setCachedPlayerCount] = useState(0);

  // Check cached player count on mount
  useEffect(() => {
    const cached = getAllCachedPlayers();
    setCachedPlayerCount(cached.length);
  }, []);

  const handleSearch = (text) => {
    setQuery(text);
    if (text.length > 0) {
      // First search in cached API players
      const apiResults = searchCachedPlayers(text);

      // Also search in mock players as fallback
      const mockResults = mockSearchPlayers.filter(p =>
        p.toLowerCase().includes(text.toLowerCase())
      );

      // Merge results — API players first, then mock (deduped)
      const mergedResults = [];
      const seenNames = new Set();

      apiResults.forEach(p => {
        if (!seenNames.has(p.name.toLowerCase())) {
          mergedResults.push({
            name: p.name,
            team: p.team || '',
            playerId: p.id,
            source: 'api',
          });
          seenNames.add(p.name.toLowerCase());
        }
      });

      mockResults.forEach(name => {
        if (!seenNames.has(name.toLowerCase())) {
          mergedResults.push({
            name,
            team: '',
            playerId: null,
            source: 'mock',
          });
          seenNames.add(name.toLowerCase());
        }
      });

      setResults(mergedResults);
    } else {
      setResults([]);
    }
  };

  const getPlayerData = (name) => {
    const key = Object.keys(playersData).find(k =>
      playersData[k].name?.replace('\n', ' ').includes(name.split(' ').pop())
    );
    return key ? playersData[key] : null;
  };

  const handleSelect = (item) => {
    // If it's an API player with ID, navigate with playerId
    if (item.playerId) {
      const mockPlayer = getPlayerData(item.name);
      navigation.navigate('PlayerStats', {
        player: mockPlayer || { name: item.name, country: '' },
        playerId: item.playerId,
      });
    } else {
      // Fallback to mock player data
      const player = getPlayerData(item.name);
      if (player) {
        navigation.navigate('PlayerStats', { player });
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#151621" translucent />
      <Header title="Search Players" />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for players..."
            placeholderTextColor={colors.textMuted}
            value={query}
            onChangeText={handleSearch}
            autoCapitalize="none"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
        {cachedPlayerCount > 0 && (
          <Text style={styles.cacheInfo}>
            {cachedPlayerCount} players indexed from live matches
          </Text>
        )}
      </View>

      {/* Results */}
      {results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item, idx) => `${item.name}-${idx}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => handleSelect(item)}
            >
              <View style={styles.resultAvatar}>
                <Text style={styles.resultInitial}>{item.name.charAt(0)}</Text>
              </View>
              <View style={styles.resultInfo}>
                <Text style={styles.resultName}>{item.name}</Text>
                {item.team ? (
                  <Text style={styles.resultTeam}>{item.team}</Text>
                ) : null}
              </View>
              {item.source === 'api' && (
                <View style={styles.apiBadge}>
                  <Text style={styles.apiBadgeText}>LIVE</Text>
                </View>
              )}
              <Text style={styles.resultArrow}>›</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.resultsList}
        />
      ) : (
        <View style={styles.emptyState}>
          {query.length > 0 ? (
            <Text style={styles.emptyText}>No players found</Text>
          ) : (
            <>
              <Text style={styles.emptyIcon}>⌕</Text>
              <Text style={styles.emptyTitle}>Search Players</Text>
              <Text style={styles.emptyText}>
                Find player stats, arena metrics and more
              </Text>
              <Text style={styles.emptySubtext}>
                Players are indexed from live match lineups
              </Text>
            </>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    paddingHorizontal: spacing.screenPaddingH,
    paddingVertical: spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: spacing.inputRadius,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    color: colors.textMuted,
    fontSize: 22,
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    color: colors.textPrimary,
    ...typography.body,
    paddingVertical: spacing.md,
  },
  clearIcon: {
    color: colors.textMuted,
    fontSize: 16,
    padding: spacing.sm,
  },
  cacheInfo: {
    color: colors.textMuted,
    fontSize: 10,
    textAlign: 'center',
    marginTop: 6,
  },
  resultsList: {
    paddingHorizontal: spacing.screenPaddingH,
    paddingBottom: 100,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  resultAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardBackgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  resultInitial: {
    color: colors.textPrimary,
    ...typography.label,
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    color: colors.textPrimary,
    ...typography.bodyLarge,
  },
  resultTeam: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  apiBadge: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  apiBadgeText: {
    color: '#3B82F6',
    fontSize: 9,
    fontWeight: '700',
  },
  resultArrow: {
    color: colors.textMuted,
    fontSize: 24,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyIcon: {
    fontSize: 48,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    color: colors.textPrimary,
    ...typography.h3,
    marginBottom: spacing.sm,
  },
  emptyText: {
    color: colors.textSecondary,
    ...typography.body,
    textAlign: 'center',
  },
  emptySubtext: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 8,
  },
});

export default SearchScreen;
