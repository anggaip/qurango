import React from 'react';
import type {PropsWithChildren} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {TouchableRipple, useTheme} from 'react-native-paper';

type SectionProps = PropsWithChildren<{
  title?: string;
  nomor: number;
  textLatin?: string;
  tempatTurun?: string;
  jumlahAyat?: number;
}>;

type Home = PropsWithChildren<{
  nomor?: any;
  nama?: string;
  teksArab?: string;
  nomorAyat?: number;
  namaLatin?: string;
  tempatTurun?: string;
  jumlahAyat?: number;
}>;

type HomeProps = PropsWithChildren<{
  surah: Home;
  nomorSurah: number;
  onPress?: any;
}>;

type NomorAyat = {
  nomor: number;
};

type BismillahProps = {
  nomor: number;
  nomorSurah: number;
};

const Section: React.FC<SectionProps> = props => {
  const {title, nomor, textLatin} = props;
  const theme = useTheme();

  const arabicNumber = nomor.toLocaleString('ar-EG');
  return (
    <View style={styles.sectionContainer}>
      {renderLeftSection(props, theme)}
      <Text
        style={[
          styles.sectionTitle,
          {
            color: theme.colors.onTertiaryContainer,
            // backgroundColor: 'grey'
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
  theme: object,
) => {
  const {nomor, textLatin, tempatTurun, jumlahAyat} = props;

  if (!textLatin) {
    return null;
  }

  return (
    <>
      <NomorAyat nomor={nomor} />
      <View style={{flex: 3, flexDirection: 'column'}}>
        <Text
          style={[
            styles.textLatin,
            styles.highlight,
            {
              color: theme.colors.onTertiaryContainer,
              // backgroundColor: 'green',
              textAlignVertical: 'bottom',
            },
          ]}>
          {textLatin}
        </Text>
        <Text
          style={{
            flex: 1,
            color: theme.colors.onTertiaryContainer,
            fontSize: 12,
            // backgroundColor: 'black',
          }}>
          {tempatTurun} | {jumlahAyat} ayat
        </Text>
      </View>
    </>
  );
};

const NomorAyat: React.FC<NomorAyat> = ({nomor}) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.nomorAyatWrapper,
        {
          backgroundColor: theme.colors.primary,
          justifyContent: 'center',
          alignSelf: 'center',
          alignContent: 'center',
          marginRight: 15,
          height: 45,
          borderRadius: 50,
          overflow: 'hidden',
        },
      ]}>
      <Text
        style={[
          styles.nomorAyat,
          {
            color: theme.colors.onPrimary,
            fontSize: 18,
            textAlign: 'center',
            includeFontPadding: false,
          },
        ]}>
        {nomor}
      </Text>
    </View>
  );
};

const Bismillah: React.FC<BismillahProps> = ({nomor, nomorSurah}) => {
  const theme = useTheme();
  const isNotFirstAyah = nomor !== 1;
  const isAlfatihah = nomorSurah === 1;
  const isAttaubah = nomorSurah === 9;

  if (isAlfatihah || isAttaubah || isNotFirstAyah) {
    return null;
  }

  return (
    <View
      style={{
        backgroundColor: theme.colors.tertiaryContainer,
        paddingVertical: 10,
        marginBottom: 5,
      }}>
      <Text
        style={{
          fontFamily: 'LPMQ',
          textAlign: 'center',
          fontSize: 18,
          color: theme.colors.onTertiaryContainer,
        }}>
        ﷽
      </Text>
    </View>
  );
};

const Home: React.FC<HomeProps> = ({surah, onPress, nomorSurah}) => {
  const theme = useTheme();

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
    <>
      <Bismillah nomorSurah={nomorSurah} nomor={nomor} />
      <View
        key={nomor}
        style={{
          backgroundColor: theme.colors.tertiaryContainer,
          marginVertical: 7,
          marginHorizontal: 15,
          borderRadius: 13,
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
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    flexDirection: 'row',
    // marginTop: 15,
    paddingHorizontal: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: '#cdccce',
    // paddingBottom: 10,
  },
  sectionTitle: {
    flex: 3,
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'LPMQ',
    lineHeight: 60,
  },
  nomorAyatWrapper: {
    flex: 1,
  },
  nomorAyat: {
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
