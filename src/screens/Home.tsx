import React from 'react';
import type {PropsWithChildren} from 'react';
import {Text, useColorScheme, StyleSheet, View, Pressable} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {TouchableRipple} from 'react-native-paper';

type SectionProps = PropsWithChildren<{
  title?: string;
  nomor: number;
}>;

interface Home {
  nomor: any;
  nama?: string;
  teksArab?: string;
  nomorAyat?: number;
}

type HomeProps = PropsWithChildren<{
  surah: Home;
  onPress?: any;
}>;

function Section({title, nomor}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? '#eeeeee' : Colors.black,
          },
        ]}>
        {title} <Text style={styles.nomorAyat}>({nomor})</Text>
      </Text>
    </View>
  );
}

function Home({surah, onPress}: HomeProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  let text;
  let nomor;
  if (surah.teksArab) {
    text = surah.teksArab;
    nomor = surah.nomorAyat;
  } else {
    text = surah.nama;
    nomor = surah.nomor;
  }
  return (
    <View
      key={nomor}
      style={{
        backgroundColor: isDarkMode ? '#283c63' : Colors.white,
        paddingHorizontal: 15,
      }}>
      <TouchableRipple onPress={onPress}>
        <Section title={text} nomor={nomor} />
      </TouchableRipple>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    marginTop: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#928a97',
    paddingBottom: 10,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: '600',
    // fontFamily: 'Zokrofi'
    fontFamily: 'LPMQ',
    // fontFamily: 'pdms-saleem-quranfont',
  },
  nomorAyat: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'LPMQ',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Home;
