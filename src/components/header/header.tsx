import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import Logo from '../logo/logo';

function Header() {
  return (
    <View style={styles.container}>
      <Logo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingVertical: 10,
  },
});

export default Header;
