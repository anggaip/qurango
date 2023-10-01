import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {ActivityIndicator, MD2Colors, Searchbar} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Home from './Home';
import NetworkFacade from '../network/NetworkFacade';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  SurahList: undefined;
  Surah: {surah: string; title: string};
};

type Props = NativeStackScreenProps<RootStackParamList, 'SurahList'>;

type Item = {
  item: object;
};

type SurahList = {
  code: number;
  data: object[];
  message: string;
};

const SurahListScreen: React.FC<Props> = navigation => {
  const [surahList, setSurahList] = useState<SurahList[]>([]);
  const [filterSurahList, setFilterSurahList] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  useEffect(() => {
    if (surahList.length === 0) {
      NetworkFacade.get('https://equran.id/api/v2/surat').then(response => {
        setSurahList(response.data);
      });
    }
  }, [surahList.length]);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#283c63' : Colors.lighter,
    flex: 1,
    paddingBottom: 70,
  };

  const onChangeSearch = (value: string): void => {
    setSearchQuery(value);
    const newData = surahList.data.filter((item: any) => {
      const itemData = item.namaLatin.toLowerCase();
      const newItemData = itemData.replace(/-/g, ' ');
      return newItemData.indexOf(value.toLowerCase()) > -1;
    });
    setFilterSurahList(newData);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle="light-content" backgroundColor="#080f58" />
      <View style={styles.container}>
        <Searchbar
          placeholder="Cari surat"
          onChangeText={onChangeSearch}
          value={searchQuery}
          clearIcon={'close-circle-outline'}
          style={[
            {backgroundColor: isDarkMode ? '#283c63' : Colors.lighter},
            styles.searchBar,
          ]}
        />
      </View>
      {renderContent(surahList, filterSurahList, searchQuery, navigation)}
    </SafeAreaView>
  );
};

const renderContent: (
  surahList: SurahList[],
  filterSurahList: string[],
  searchQuery: string,
  navigation: Props,
) => JSX.Element = (
  surahList: any,
  filterSurahList: string[],
  searchQuery: string,
  navigation,
) => {
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

  let newSurahList = surahList.data;

  if (filterSurahList.length !== 0) {
    newSurahList = filterSurahList;
  }

  if (filterSurahList.length === 0 && searchQuery) {
    return (
      <View style={styles.notFoundWrapper}>
        <Text style={styles.notFoundText}>Nama surat tidak ditemukan</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={newSurahList}
        renderItem={item => renderItem(item, navigation)}
        keyExtractor={item => item.nomor}
      />
    </View>
  );
};

const renderItem: React.FC<Item> = ({item}, navigation) => {
  return (
    <Home surah={item} onPress={() => handleOnpressList(item, navigation)} />
  );
};

const handleOnpressList = (item: any, {navigation}: Props): void => {
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
  container: {
    backgroundColor: '#080f58',
    paddingHorizontal: 10,
  },
  searchBar: {
    marginBottom: 15,
  },
  notFoundWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
  notFoundText: {
    fontFamily: 'LPMQ',
    fontSize: 16,
  },
});

export default SurahListScreen;
