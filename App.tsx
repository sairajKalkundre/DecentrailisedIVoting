/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import Home from './src/screens/Home';
import CampaignList from './src/screens/CampaignList';
import Area from './src/screens/Area';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Area" component={Area} />
        <Stack.Screen name="Campaign List" component={CampaignList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
