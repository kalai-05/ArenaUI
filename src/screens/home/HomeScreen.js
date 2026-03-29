import React, { useState } from 'react';
import {
  View, Text, StyleSheet, StatusBar, ScrollView,
} from 'react-native';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import Header from '../../components/common/Header';
import MatchHeader from '../../components/common/MatchHeader';
import TabSelector from '../../components/common/TabSelector';
import GodsEyeView from '../../components/match/GodsEyeView';
import Timeline from '../../components/match/Timeline';
import ImpactMetrics from '../../components/match/ImpactMetrics';
import PlayerCard from '../../components/common/PlayerCard';
import {
  matchData, godsEyeView, timelineData, playersData, squadData,
} from '../../data/mockData';

const HomeScreen = ({ navigation }) => {
  const [activeMatchTab, setActiveMatchTab] = useState(0);
  const [activeContentTab, setActiveContentTab] = useState(0);

  const match = activeMatchTab === 0
    ? matchData.liveMatch
    : activeMatchTab === 1
    ? matchData.completedMatch
    : matchData.upcomingMatch;

  const bowlerData = {
    name: 'M. Jansen',
    o: '2.1',
    r: '24',
    w: '0',
    zeros: 2,
    fours: 4,
    sixes: 1,
    ex: 1,
    ss: '3°',
    pace: '137 km/h',
    impact: 55,
  };

  const batsmenData = [
    { name: 'H. Pandya', r: 57, b: 27, fours: 3, sixes: 1, impact: 87, impactColor: '#52B4F5' },
    { name: 'T. Varma', r: 24, b: 8, fours: 1, sixes: 0, impact: 67, impactColor: '#52B4F5' },
  ];

  const renderBallByBall = () => (
    <>
      <GodsEyeView 
        data={{...godsEyeView, timing: '73%', control: '87%'}} 
        onActionPress={(action) => {
          if (action === 'Wagon Wheel') navigation.navigate('WagonWheel');
          if (action === 'Line/Length') navigation.navigate('LineAndLengthScreen');
          if (action === 'Playing XI') setActiveContentTab(1);
        }}
      />
      <Timeline data={timelineData} />
      
      <ImpactMetrics type="bowler" data={bowlerData} />
      <ImpactMetrics type="batsmen" data={batsmenData} />
      
      <View style={{ marginTop: spacing.lg }}>
        <PlayerCard 
          player={{
            ...playersData.marcoJansen,
            stats: [
              { label: 'Economy', value: '12.5' },
              { label: 'Wickets', value: '0' },
              { label: 'Balls Per Boundary', value: '3' },
            ],
            xStats: [
              { label: 'xEconomy', value: '10.67' },
              { label: 'xWickets', value: '1.27' },
              { label: 'xBalls Per Boundary', value: '5.25' },
            ],
            country: '🇿🇦'
          }}
          onSeeMetrics={() => navigation.navigate('PlayerStats', { player: playersData.marcoJansen })}
        />
      </View>
    </>
  );

  const renderPlayerXI = () => (
    <View style={styles.playingXI}>
      <View style={styles.squadContainer}>
        <View style={styles.squadColumn}>
          <View style={styles.squadHeader}>
            <Text style={styles.squadFlag}>🇮🇳</Text>
            <Text style={styles.squadTeamName}>India</Text>
          </View>
          {squadData.india.players.map((player, i) => (
            <View key={i} style={styles.squadPlayer}>
              <View style={styles.squadPlayerDot} />
              <Text style={styles.squadPlayerName}>{player}</Text>
            </View>
          ))}
        </View>
        <View style={styles.squadColumn}>
          <View style={styles.squadHeader}>
            <Text style={styles.squadFlag}>🇿🇦</Text>
            <Text style={styles.squadTeamName}>South Africa</Text>
          </View>
          {squadData.southAfrica.players.map((player, i) => (
            <View key={i} style={styles.squadPlayer}>
              <View style={styles.squadPlayerDot} />
              <Text style={styles.squadPlayerName}>{player}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <Header showLogo />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <MatchHeader match={match} />

        <TabSelector
          tabs={['Live', 'Completed', 'Upcoming']}
          activeTab={activeMatchTab}
          onTabChange={setActiveMatchTab}
          style={styles.matchTabs}
        />

        <TabSelector
          tabs={['Ball by Ball', 'PlayerXI']}
          activeTab={activeContentTab}
          onTabChange={setActiveContentTab}
        />

        {activeContentTab === 0 ? renderBallByBall() : renderPlayerXI()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100, // Account for 80px tab bar + breathing room
  },
  matchTabs: {
    marginVertical: spacing.sm,
  },
  playingXI: {
    paddingTop: spacing.lg,
  },
  squadContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.screenPaddingH,
    gap: spacing.xl,
    backgroundColor: '#141521',
    marginHorizontal: spacing.screenPaddingH,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  squadColumn: {
    flex: 1,
  },
  squadHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  squadFlag: {
    fontSize: 18,
  },
  squadTeamName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  squadPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    gap: 10,
  },
  squadPlayerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  squadPlayerName: {
    color: '#CCCCCC',
    fontSize: 12,
  },
});

export default HomeScreen;
