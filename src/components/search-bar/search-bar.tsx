import * as React from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Icon} from 'native-base';

interface Props {
  valInput: Function;
}

function SearchBar(props: Props) {
  const {colors} = useTheme();
  const inputRef: React.RefObject<TextInput> = React.useRef(null);
  const [inputValue, setInputValue] = React.useState('');

  const {valInput} = props;

  function valChanged(text: string) {
    valInput(text);
    setInputValue(text);
  }

  return (
    <View style={[styles.searchbarContainer, {borderColor: colors.border}]}>
      <TextInput
        style={styles.searchInput}
        onChangeText={(text) => valChanged(text)}
        value={inputValue}
        ref={inputRef}
      />
      <TouchableOpacity onPress={() => (inputValue.length === 0 ? null : valChanged(''))}>
        <Icon
          type="FontAwesome5"
          style={styles.searchIcon}
          name={inputValue.length === 0 ? 'search' : 'times'}
        />
      </TouchableOpacity>
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
