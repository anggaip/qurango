import React from 'react';
import {Appbar, useTheme} from 'react-native-paper';
import {getHeaderTitle} from '@react-navigation/elements';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  SurahList: undefined;
  Surah: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;

type NavigationBarProps = {
  navigation: Props['navigation'];
  route: Props['route'];
  options: object;
  back: boolean;
};

const CustomNavigationBar: React.FC<NavigationBarProps> = ({
  navigation,
  route,
  options,
  back,
}) => {
  // const [visible, setVisible] = React.useState(false);
  // const [searchBarVisible, setSearchBarVisible] = React.useState(false);
  // const [searchQuery, setSearchQuery] = React.useState('');

  // const openSearchBar = () => {
  //   setSearchBarVisible(true);
  // };
  //
  // const closeSearchBar = () => {
  //   setSearchBarVisible(false);
  // };
  //
  // const onChangeSearch = value => setSearchQuery(value);

  // const openMenu = () => setVisible(true);

  // const closeMenu = () => setVisible(false);

  const title = getHeaderTitle(options, route.name);

  const theme = useTheme();

  return (
    <Appbar.Header
      style={{backgroundColor: theme.colors.onPrimaryContainer}}
      mode={back ? 'small' : 'center-aligned'}>
      {back ? (
        <Appbar.BackAction iconColor="#DAE1E7" onPress={navigation.goBack} />
      ) : null}
      <Appbar.Content
        title={title}
        titleStyle={{color: theme.colors.onPrimary}}
      />
      {/*{!back ? (*/}
      {/*  !searchBarVisible ? (*/}
      {/*    <>*/}
      {/*      <Appbar.Action*/}
      {/*        icon="magnify"*/}
      {/*        iconColor="#DAE1E7"*/}
      {/*        onPress={openSearchBar}*/}
      {/*      />*/}
      {/*      <Menu*/}
      {/*        visible={visible}*/}
      {/*        onDismiss={closeMenu}*/}
      {/*        anchor={*/}
      {/*          <Appbar.Action icon="dots-vertical" onPress={openMenu} />*/}
      {/*        }>*/}
      {/*        <Menu.Item onPress={() => {}} title="Pengaturan" />*/}
      {/*      </Menu>*/}
      {/*    </>*/}
      {/*  ) : (*/}
      {/*    <Searchbar*/}
      {/*      placeholder="Cari surat"*/}
      {/*      onChangeText={onChangeSearch}*/}
      {/*      value={searchQuery}*/}
      {/*      autoFocus*/}
      {/*      icon={'arrow-left'}*/}
      {/*      onIconPress={closeSearchBar}*/}
      {/*      clearIcon={'close-circle-outline'}*/}
      {/*      style={{*/}
      {/*        backgroundColor: '#283c63',*/}
      {/*        // borderStyle: 'solid',*/}
      {/*        // borderColor: '#283c63',*/}
      {/*        // borderWidth: 2,*/}
      {/*        // marginTop: 15,*/}
      {/*      }}*/}
      {/*      // traileringIcon={'camera'}*/}
      {/*    />*/}
      {/*  )*/}
      {/*) : null}*/}
    </Appbar.Header>
  );
};

export default CustomNavigationBar;
