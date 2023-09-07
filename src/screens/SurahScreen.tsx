import React, {PropsWithChildren, useEffect} from 'react';
import {FlatList, SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Home from './Home';

interface Surah {
  params: any;
}

type SurahProps = PropsWithChildren<{
  navigation: any;
  route: Surah;
}>;

function SurahScreen({navigation, route}: SurahProps): JSX.Element {
  useEffect(() => {
    navigation.setOptions({title: route.params.title});
  }, []);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const {surah} = route.params;

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <FlatList
        data={surah.ayat}
        renderItem={item => renderItem(item)}
        keyExtractor={item => item.nomor}
      />
    </SafeAreaView>
  );
}

const renderItem = ({item}: {item: object}): JSX.Element => {
  return <Home surah={item} />;
};

export default SurahScreen;
