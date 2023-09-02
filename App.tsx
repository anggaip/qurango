/**
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Text,
  useColorScheme,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import Home from './src/screens/Home'
import NetworkFacade from './src/network/NetworkFacade';

function App(): JSX.Element {
  const [surahList, setSurahList] = useState([])
  const [surah, setSurah] = useState({})

  useEffect(() => {
    NetworkFacade
    .get('https://equran.id/api/v2/surat')
    .then(response => {
      setSurahList(response.data)
    })
    // NetworkFacade
    // .get('https://equran.id/api/v2/surat/1')
    // .then(response => {
    //   setSurah(response.data)
    // })
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
        <FlatList
          data={surahList.data}
          renderItem={item => renderItem(item)}
          keyExtractor={(item) => item.nomor}
        />
        {/* <FlatList
          data={surah.data?.ayat}
          renderItem={item => renderItem(item)}
          keyExtractor={(item) => item.nomor}
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const renderItem = ({item}): JSX.Element => {
  return (
    <Home surah={item}/>
  )
}

export default App;
