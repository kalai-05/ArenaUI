import React, { useState } from 'react';
import {
  View, Text, StyleSheet, StatusBar, TextInput,
  FlatList, TouchableOpacity,
} from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';
import Header from '../../components/common/Header';
import { searchPlayers, playersData } from '../../data/mockData';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (text) => {
    setQuery(text);
    if (text.length > 0) {
      const filtered = searchPlayers.filter(p =>
        p.toLowerCase().includes(text.toLowerCase())
      );
      setResults(filtered);
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

  const handleSelect = (name) => {
    const player = getPlayerData(name);
    if (player) {
      navigation.navigate('PlayerStats', { player });
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
      </View>

      {/* Results */}
      {results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => handleSelect(item)}
            >
              <View style={styles.resultAvatar}>
                <Text style={styles.resultInitial}>{item.charAt(0)}</Text>
              </View>
              <Text style={styles.resultName}>{item}</Text>
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
  resultsList: {
    paddingHorizontal: spacing.screenPaddingH,
    paddingBottom: 100, // Fixed bottom overlap
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
  resultName: {
    color: colors.textPrimary,
    ...typography.bodyLarge,
    flex: 1,
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
});

export default SearchScreen;
