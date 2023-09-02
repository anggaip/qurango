import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import Home from './Home';
import NetworkFacade from '../network/NetworkFacade';

type SurahListProps = {
  navigation: object
}

function SurahListScreen({ navigation }: SurahListProps): JSX.Element {
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
        <FlatList
          data={surahList.data}
          renderItem={item => renderItem(item, navigation)}
          keyExtractor={(item) => item.nomor}
          style={backgroundStyle}
        />
        {/* <FlatList
          data={surah.data?.ayat}
          renderItem={item => renderItem(item)}
          keyExtractor={(item) => item.nomor}
        /> */}
    </SafeAreaView>
  );
}

const renderItem = ({item}: {item: object}, navigation: SurahListProps): JSX.Element => {
  return (
    <Home surah={item} navigation={navigation}/>
  )
}

export default SurahListScreen;
