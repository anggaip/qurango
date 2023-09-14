import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {ActivityIndicator, MD3Colors, Searchbar} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Home from './Home';
import NetworkFacade from '../network/NetworkFacade';

type SurahListProps = {
  navigation: any;
};

function SurahListScreen({navigation}: SurahListProps): JSX.Element {
  const [surahList, setSurahList] = useState([]);
  const [filterSurahList, setFilterSurahList] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  useEffect(() => {
    if (surahList.length === 0) {
      NetworkFacade.get('https://equran.id/api/v2/surat').then(response => {
        setSurahList(response.data);
      });
    }
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#283c63' : Colors.lighter,
    flex: 1,
    paddingBottom: 70,
  };

  const onChangeSearch = value => {
    setSearchQuery(value);
    const newData = surahList.data.filter(item => {
      const itemData = item.namaLatin.toLowerCase();
      const newItemData = itemData.replace(/-/g, ' ');
      return newItemData.indexOf(value.toLowerCase()) > -1;
    });
    setFilterSurahList(newData);
  };

  // const handleSearchBar = () => {
  //   const newData = surahList.data.filter(item => {
  //     const itemData = item.namaLatin.toLowerCase();
  //     const newItemData = itemData.replace(/-/g, ' ');
  //     return newItemData.indexOf(searchQuery) > -1;
  //   });
  //   setFilterSurahList(newData);
  // }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle="light-content" backgroundColor="#080f58" />
      <View style={{backgroundColor: '#080f58', paddingHorizontal: 10}}>
        <Searchbar
          placeholder="Cari surat"
          onChangeText={onChangeSearch}
          value={searchQuery}
          // autoFocus
          // icon={'arrow-left'}
          // onIconPress={handleSearchBar}
          clearIcon={'close-circle-outline'}
          // inputStyle={{
          //   backgroundColor: '#DAE1E7',
          // }}
          style={{
            backgroundColor: isDarkMode ? '#283c63' : Colors.lighter,
            // color: '#DAE1E7',
            // borderStyle: 'solid',
            // borderColor: '#283c63',
            // borderWidth: 2,
            // width: '90%',
            // maxHeight: 50,
            marginBottom: 15,
          }}
          // traileringIcon={'camera'}
        />
      </View>
      {renderContent(surahList, filterSurahList, {navigation})}
    </SafeAreaView>
  );
}

const renderContent = (surahList, filterSurahList, {navigation}) => {
  if (surahList.length === 0) {
    return (
      <ActivityIndicator
        style={styles.activityIndicator}
        size={'large'}
        animating={true}
        color={MD3Colors.red800}
      />
    );
  }

  let newSurahList = surahList.data;

  if (filterSurahList.length !== 0) {
    newSurahList = filterSurahList
  }

  return (
    <View>
      <FlatList
        data={newSurahList}
        renderItem={item => renderItem(item, navigation)}
        keyExtractor={item => item.nomor}
        // style={backgroundStyle}
      />
    </View>
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
