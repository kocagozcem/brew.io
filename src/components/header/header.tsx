import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';
import * as React from 'react';
import {View, StyleSheet, TouchableHighlight} from 'react-native';
import Logo from '../logo/logo';

interface Props {
  hasCreate: boolean;
}

function Header(props: Props) {
  const {hasCreate} = props;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Logo fontSize={25} />
      {hasCreate ? (
        <View style={styles.createContainer}>
          <TouchableHighlight onPress={() => navigation.navigate('CreateRecipe')}>
            <View>
              <Icon type="Ionicons" name="create-outline" />
            </View>
          </TouchableHighlight>
        </View>
      ) : null}
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

  createContainer: {
    position: 'absolute',
    zIndex: 15,
    right: 20,
    top: 10,
  },
});

export default Header;
