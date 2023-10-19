/**
 * @format
 */

import React, {useEffect} from 'react';
import {Alert, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PaperProvider, MD3LightTheme, MD3DarkTheme} from 'react-native-paper';
import messaging from '@react-native-firebase/messaging';

import SurahScreen from './src/screens/SurahScreen';
import SurahListScreen from './src/screens/SurahListScreen';
import CustomNavigationBar from './src/components/CustomNavigationBar';
import NotificationHelper from './src/helpers/NotificationHelper';
import lightTheme from './src/assets/themes/light.json';
import darkTheme from './src/assets/themes/dark.json';

type SurahProps = {
  ayat: object;
};

export type RootStackParamList = {
  SurahList: undefined;
  Surah: {surah: SurahProps[]; title: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Main: React.FC = () => {
  const notification = new NotificationHelper();
  notification.getDeviceToken().then(function (response) {
    console.log(response);
  });

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(JSON.stringify(remoteMessage));
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  });

  // const isDarkMode = useColorScheme() === 'dark';

  let customTheme = {
    ...MD3LightTheme,
    colors: lightTheme.colors,
  };

  // if (isDarkMode) {
  //   customTheme = {
  //     ...MD3DarkTheme,
  //     colors: darkTheme.colors,
  //   };
  // } else {
  //   customTheme = {
  //     ...MD3LightTheme,
  //     colors: lightTheme.colors,
  //   };
  // }

  return (
    <PaperProvider theme={customTheme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SurahList"
          screenOptions={{
            header: props => <CustomNavigationBar {...props} />,
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
};

const App: React.FC = () => {
  return (
    <PaperProvider>
      <Main />
    </PaperProvider>
  );
};

export default App;
