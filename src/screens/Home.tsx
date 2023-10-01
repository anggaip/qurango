import React from 'react';
import type {PropsWithChildren} from 'react';
import {Text, useColorScheme, StyleSheet, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {TouchableRipple} from 'react-native-paper';

type SectionProps = PropsWithChildren<{
  title?: string;
  nomor: number;
  textLatin?: string;
  tempatTurun?: string;
  jumlahAyat?: number;
}>;

type Home = PropsWithChildren<{
  nomor: any;
  nama: string;
  teksArab: string;
  nomorAyat: number;
  namaLatin: string;
  tempatTurun: string;
  jumlahAyat: number;
}>;

type HomeProps = PropsWithChildren<{
  surah: Home;
  onPress?: any;
}>;

const Section: React.FC<SectionProps> = props => {
  const {title, nomor, textLatin} = props;

  const isDarkMode = useColorScheme() === 'dark';
  const arabicNumber = nomor.toLocaleString('ar-EG');
  return (
    <View style={styles.sectionContainer}>
      {renderLeftSection(props, isDarkMode)}
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? '#eeeeee' : Colors.black,
          },
        ]}>
        {title}
        {!textLatin ? (
          <Text
            style={[
              styles.nomorAyat,
              {
                fontSize: 28,
              },
            ]}>
            {arabicNumber}
          </Text>
        ) : null}
      </Text>
    </View>
  );
};

const renderLeftSection: React.FC<SectionProps> = (
  props,
  isDarkMode: boolean,
) => {
  const {nomor, textLatin, tempatTurun, jumlahAyat} = props;

  if (!textLatin) {
    return null;
  }

  return (
    <>
      <Text
        style={[
          styles.nomorAyat,
          {
            color: isDarkMode ? '#eeeeee' : Colors.black,
            fontSize: 16,
          },
        ]}>
        ({nomor})
      </Text>
      <View style={{flex: 3, flexDirection: 'column'}}>
        <Text
          style={[
            styles.textLatin,
            styles.highlight,
            {
              color: isDarkMode ? '#eeeeee' : Colors.black,
            },
          ]}>
          {textLatin}
        </Text>
        <Text style={{flex: 1, color: isDarkMode ? '#eeeeee' : Colors.black}}>
          {tempatTurun} | {jumlahAyat} ayat
        </Text>
      </View>
    </>
  );
};

const Home: React.FC<HomeProps> = ({surah, onPress}: HomeProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  let text;
  let nomor;
  let textLatin;
  let tempatTurun;
  let jumlahAyat;
  if (surah.teksArab) {
    text = surah.teksArab;
    nomor = surah.nomorAyat;
  } else {
    text = surah.nama;
    nomor = surah.nomor;
    textLatin = surah.namaLatin;
    tempatTurun = surah.tempatTurun;
    jumlahAyat = surah.jumlahAyat;
  }
  return (
    <View
      key={nomor}
      style={{
        backgroundColor: isDarkMode ? '#283c63' : Colors.white,
        paddingHorizontal: 15,
      }}>
      <TouchableRipple onPress={onPress}>
        <Section
          title={text}
          nomor={nomor}
          textLatin={textLatin}
          tempatTurun={tempatTurun}
          jumlahAyat={jumlahAyat}
        />
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#928a97',
    paddingBottom: 10,
  },
  sectionTitle: {
    flex: 3,
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'LPMQ',
    lineHeight: 60,
  },
  nomorAyat: {
    flex: 1,
    fontWeight: '400',
    fontFamily: 'LPMQ',
  },
  textLatin: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'LPMQ',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Home;
