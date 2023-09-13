import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Home from './Home';
import NetworkFacade from '../network/NetworkFacade';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';

type SurahListProps = {
  navigation: any;
};

function SurahListScreen({navigation}: SurahListProps): JSX.Element {
  const [surahList, setSurahList] = useState([]);

  useEffect(() => {
    NetworkFacade.get('https://equran.id/api/v2/surat').then(response => {
      setSurahList(response.data);
    });
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#283c63' : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle="light-content" backgroundColor="#080f58" />
      {renderContent(surahList, {navigation})}
    </SafeAreaView>
  );
}

const renderContent = (surahList, {navigation}) => {
  if (surahList.length === 0) {
    return (
      <ActivityIndicator
        style={styles.activityIndicator}
        size={'large'}
        animating={true}
        color={MD2Colors.red800}
      />
    );
  }

  return (
    <FlatList
      data={surahList.data}
      renderItem={item => renderItem(item, navigation)}
      keyExtractor={item => item.nomor}
      // style={backgroundStyle}
    />
  );
};

const renderItem = (
  {item}: {item: object},
  navigation: SurahListProps,
): JSX.Element => {
  return (
    <Home surah={item} onPress={() => handleOnpressList(item, navigation)} />
  );
};

const handleOnpressList = (item: any, navigation: SurahListProps) => {
  NetworkFacade.get(`https://equran.id/api/v2/surat/${item.nomor}`).then(
    function (response) {
      if (response.data.code === 200) {
        navigation.navigate('Surah', {
          surah: response.data.data,
          title: item.namaLatin,
        });
      }
    },
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
  },
});

export default SurahListScreen;
