import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';
import Button from '../../components/common/Button';
import Header from '../../components/common/Header';
import FollowListItem from '../../components/common/FollowListItem';
import { playersToFollow } from '../../data/mockData';

const FollowPlayersScreen = ({ navigation }) => {
  const [followedPlayers, setFollowedPlayers] = useState([]);

  const toggleFollow = (name) => {
    setFollowedPlayers(prev =>
      prev.includes(name)
        ? prev.filter(p => p !== name)
        : [...prev, name]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <Header showBack onBackPress={() => navigation.goBack()} />

      <Text style={styles.title}>FOLLOW YOUR PLAYERS</Text>

      <View style={styles.spacer} />

      <FlatList
        data={playersToFollow}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <FollowListItem
            name={item.name}
            subtitle={item.country}
            isFollowing={followedPlayers.includes(item.name)}
            onFollowPress={() => toggleFollow(item.name)}
            type="player"
          />
        )}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.buttonSection}>
        <Button
          title="NEXT"
          onPress={() => navigation.navigate('MainTabs')}
          variant="primary"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    color: colors.textPrimary,
    ...typography.h2,
    paddingHorizontal: spacing.screenPaddingH,
    marginTop: spacing.lg,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  spacer: {
    height: spacing.huge,
  },
  listContent: {
    paddingBottom: spacing.lg,
  },
  buttonSection: {
    paddingHorizontal: spacing.screenPaddingH,
    paddingBottom: spacing.xxl,
    paddingTop: spacing.md,
  },
});

export default FollowPlayersScreen;
