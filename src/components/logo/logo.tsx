import * as React from 'react';
import {Text, StyleSheet} from 'react-native';

interface Props {
  fontSize: number;
}

function Logo(props: Props) {
  const {fontSize} = props;
  const size: number = fontSize !== undefined ? fontSize : 22;
  return <Text style={[styles.logo, {fontSize: size}]}>Brew.io</Text>;
}

const styles = StyleSheet.create({
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Laila-Bold',
  },
});

export default Logo;
