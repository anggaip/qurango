import React from 'react'
import type {PropsWithChildren} from 'react';
import {
  Text,
  useColorScheme,
  StyleSheet,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title?: string;
}>;

interface Home {
  nama?: string,
  deskripsi?: string
}

type HomeProps = PropsWithChildren<{
  surah: Home
}>

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
    </View>
  );
}

function Home({surah}: HomeProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      style={{
        backgroundColor: isDarkMode ? Colors.black : Colors.white,
      }}>
      <Section title={surah.nama}>
        {surah.deskripsi}
      </Section>
      {/* <Section title={surah.teksArab}>
        {surah.deskripsi}
      </Section> */}
    </View>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    // fontFamily: 'Zokrofi'
    fontFamily: 'LPMQ'
    // fontFamily: 'pdms-saleem-quranfont'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Home