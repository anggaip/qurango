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
  navigation: any
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
    </SafeAreaView>
  );
}

const renderItem = ({item}: {item: object}, navigation: SurahListProps): JSX.Element => {
  return (
    <Home
      surah={item}
      onPress={() => handleOnpressList(item, navigation)}
    />
  )
}

const handleOnpressList = (item: any, navigation: SurahListProps) => {
  NetworkFacade
    .get(`https://equran.id/api/v2/surat/${item.nomor}`)
    .then(function (response) {
      if (response.data.code === 200) {
        navigation.navigate('Surah', { surah: response.data.data, title: item.namaLatin })
      }
    })
}

export default SurahListScreen;
