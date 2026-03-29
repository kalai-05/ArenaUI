import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';

// Screen imports for stack-level navigation
import ScoreCardScreen from '../screens/match/ScoreCardScreen';
import PastOversScreen from '../screens/match/PastOversScreen';
import InningsScoreScreen from '../screens/match/InningsScoreScreen';
import StadiumDetailScreen from '../screens/match/StadiumDetailScreen';
import WagonWheelScreen from '../screens/analytics/WagonWheelScreen';
import LineAndLengthScreen from '../screens/analytics/LineAndLengthScreen';
import PlayerStatsScreen from '../screens/player/PlayerStatsScreen';

const RootStack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {/* Auth Flow */}
        <RootStack.Screen name="Auth" component={AuthNavigator} />

        {/* Main Tab Flow */}
        <RootStack.Screen name="MainTabs" component={MainTabNavigator} />

        {/* Detail Screens (modals / pushes from any tab) */}
        <RootStack.Screen name="ScoreCard" component={ScoreCardScreen} />
        <RootStack.Screen name="PastOvers" component={PastOversScreen} />
        <RootStack.Screen name="InningsScore" component={InningsScoreScreen} />
        <RootStack.Screen name="StadiumDetail" component={StadiumDetailScreen} />
        <RootStack.Screen name="WagonWheel" component={WagonWheelScreen} />
        <RootStack.Screen name="LineAndLengthScreen" component={LineAndLengthScreen} />
        <RootStack.Screen name="PlayerStats" component={PlayerStatsScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
