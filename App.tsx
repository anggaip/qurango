/**
 * @format
 */

import React from 'react';
import {useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PaperProvider} from 'react-native-paper';

import SurahScreen from './src/screens/SurahScreen';
import SurahListScreen from './src/screens/SurahListScreen';
import CustomNavigationBar from './src/components/CustomNavigationBar';

const Stack = createNativeStackNavigator();

function Main(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = isDarkMode ? '#283c63' : 'white';

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SurahList"
          screenOptions={{
            header: props => <CustomNavigationBar {...props} />,
            contentStyle: {backgroundColor: backgroundStyle},
          }}>
          <Stack.Screen
            name="SurahList"
            component={SurahListScreen}
            options={{title: "Baca Qur'an", headerTitleAlign: 'center'}}
          />
          <Stack.Screen
            name="Surah"
            component={SurahScreen}
            options={{headerTitleAlign: 'center'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

function App(): JSX.Element {
  return (
    <PaperProvider>
      <Main />
    </PaperProvider>
  );
}

export default App;
