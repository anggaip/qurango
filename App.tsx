/**
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import axios from 'axios';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import Home from './src/screens/Home'
import NetworkFacade from './src/network/NetworkFacade';

function App(): JSX.Element {
  const [surah, setSurah] = useState({})

  useEffect(() => {
    NetworkFacade
    .get('https://equran.id/api/v2/surat')
    .then(response => {
      setSurah(response.data.data[0])
    })
  }, [])
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Home surah={surah} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
