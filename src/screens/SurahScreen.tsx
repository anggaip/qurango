import React, {useEffect} from 'react';
import {FlatList, SafeAreaView, StatusBar, Text} from 'react-native';
import Home from './Home';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {useTheme} from 'react-native-paper';

type SurahProps = NativeStackScreenProps<RootStackParamList, 'Surah'>;

type ItemProps = {
  item: {
    textArab: string;
    nomorAyat: number;
  };
};

const SurahScreen: React.FC<SurahProps> = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({title: route.params.title});
  }, [navigation, route.params.title]);

  const theme = useTheme();

  const backgroundStyle = {
    flex: 1,
    backgroundColor: theme.colors.background,
  };

  const {surah} = route.params;

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.onPrimaryContainer}
      />
      <FlatList
        data={surah.ayat}
        renderItem={item => renderItem(item, surah.nomor)}
        keyExtractor={item => item.nomorAyat}
      />
    </SafeAreaView>
  );
};

const renderItem: React.FC<ItemProps> = ({item}, nomorSurah) => {
  return <Home surah={item} nomorSurah={nomorSurah} />;
};

export default SurahScreen;
