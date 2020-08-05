import * as React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Icon} from 'native-base';

function SearchBar() {
  const {colors} = useTheme();
  return (
    <View style={[styles.searchbarContainer, {borderColor: colors.border}]}>
      <TextInput style={styles.searchInput} />
      <Icon name="search" style={styles.searchIcon} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchbarContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: 35,
    marginHorizontal: 15,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    alignSelf: 'stretch',
    paddingVertical: 0,
  },
  searchIcon: {
    fontSize: 30,
  },
});

export default SearchBar;
