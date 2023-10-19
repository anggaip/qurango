import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  ActivityIndicator,
  MD2Colors,
  Searchbar,
  useTheme,
} from 'react-native-paper';
import Home from './Home';
import {getData} from '../network/NetworkFacade';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  SurahList: undefined;
  Surah: {
    surah: object[];
    title: string;
  };
};

type Props = NativeStackScreenProps<RootStackParamList, 'SurahList'>;

type SurahItem = {
  item: {
    nomor: number;
    namaLatin: string;
  };
};

type SurahList = {
  code: number;
  data: SurahListData[];
  message: string;
};

type SurahListData = {
  nama: string;
  namaLatin: string;
  nomor: number;
  jumlahAyat: number;
};

const SurahListScreen: React.FC<Props> = navigation => {
  const [surahList, setSurahList] = useState<SurahListData[]>([]);
  const [filterSurahList, setFilterSurahList] = useState(surahList);
  const [searchQuery, setSearchQuery] = React.useState('');

  useEffect(() => {
    if (surahList.length === 0) {
      const fetchSurah = async (): Promise<void> => {
        const surah = await getData<SurahList[]>(
          'https://equran.id/api/v2/surat',
        );
        setSurahList(surah.data);
      };

      fetchSurah();
    }
  }, [surahList.length]);

  const theme = useTheme();

  const backgroundStyle = {
    backgroundColor: theme.colors.background,
    flex: 1,
    paddingBottom: 70,
  };

  const onChangeSearch = (value: string): void => {
    setSearchQuery(value);
    const newData = surahList.filter(item => {
      const itemData = item.namaLatin.toLowerCase();
      const newItemData = itemData.replace(/-/g, ' ');
      return newItemData.indexOf(value.toLowerCase()) > -1;
    });
    setFilterSurahList(newData);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.onPrimaryContainer}
      />
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.onPrimaryContainer,
          },
        ]}>
        <Searchbar
          placeholder="Cari surat"
          onChangeText={onChangeSearch}
          value={searchQuery}
          clearIcon={'close-circle-outline'}
          style={[{backgroundColor: theme.colors.onPrimary}, styles.searchBar]}
        />
      </View>
      {renderContent(surahList, filterSurahList, searchQuery, navigation)}
    </SafeAreaView>
  );
};

const renderContent: (
  surahList: SurahListData[],
  filterSurahList: SurahListData[],
  searchQuery: string,
  navigation: Props,
) => JSX.Element = (surahList, filterSurahList, searchQuery, navigation) => {
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

  let newSurahList = surahList;

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
        keyExtractor={(item: SurahListData) => item.nomor.toString()}
      />
    </View>
  );
};

const renderItem: React.FC<SurahItem> = ({item}, navigation) => {
  return (
    <Home surah={item} onPress={() => handleOnpressList({item}, navigation)} />
  );
};

const handleOnpressList = async (
  {item}: SurahItem,
  {navigation}: Props,
): Promise<void> => {
  const getSurahDetail = await getData<SurahList[]>(
    `https://equran.id/api/v2/surat/${item.nomor}`,
  );

  navigation.navigate('Surah', {
    surah: getSurahDetail.data,
    title: item.namaLatin,
  });
};

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
  },
  container: {
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
