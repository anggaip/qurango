/**
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SurahScreen from './src/screens/SurahScreen';
import SurahListScreen from './src/screens/SurahListScreen';

const Stack = createNativeStackNavigator()

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SurahList' screenOptions={{ contentStyle: { backgroundColor: 'white' }, orientation: 'all' }}>
        <Stack.Screen name="SurahList" component={SurahListScreen} options={{ title: 'Baca Qur\'an', headerTitleAlign: 'center' }} />
        <Stack.Screen name="Surah" component={SurahScreen} options={{ headerTitleAlign: 'center' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
