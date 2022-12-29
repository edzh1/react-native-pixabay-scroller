import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from 'src/screens/home';
import Details from 'src/screens/details';
import {RootStackParamList} from './types';

const AppStack = createNativeStackNavigator<RootStackParamList>();

function AppNavigation() {
  return (
    <AppStack.Navigator
      initialRouteName="Home"
      screenOptions={() => ({
        headerShown: false,
      })}>
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="Details" component={Details} />
    </AppStack.Navigator>
  );
}

export default AppNavigation;
