import * as React from 'react';
import {Text, StyleSheet} from 'react-native';

function Logo() {
  return <Text style={styles.logo}>Brew.io</Text>;
}

const styles = StyleSheet.create({
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Laila-Bold',
  },
});

export default Logo;
