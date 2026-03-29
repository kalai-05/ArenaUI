import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/auth/SplashScreen';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import CreateAccountScreen from '../screens/auth/CreateAccountScreen';
import FollowTeamsScreen from '../screens/auth/FollowTeamsScreen';
import FollowPlayersScreen from '../screens/auth/FollowPlayersScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="FollowTeams" component={FollowTeamsScreen} />
      <Stack.Screen name="FollowPlayers" component={FollowPlayersScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
