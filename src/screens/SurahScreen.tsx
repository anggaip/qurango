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
    backgroundColor: isDarkMode ? '#283c63' : Colors.lighter,
  };

  const {surah} = route.params;

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle="light-content" backgroundColor="#080f58" />
      <FlatList
        data={surah.ayat}
        renderItem={item => renderItem(item)}
        keyExtractor={item => item.nomorAyat}
      />
    </SafeAreaView>
  );
}

const renderItem = ({item}: {item: object}): JSX.Element => {
  return <Home surah={item} />;
};

export default SurahScreen;
