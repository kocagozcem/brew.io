import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';
import * as React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Logo from '../logo/logo';

interface Props {
  hasCreate: boolean;
  hasBackButton: boolean;
}

function Header(props: Props) {
  const {hasCreate} = props;
  const {hasBackButton} = props;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {hasBackButton ? (
        <View style={styles.backContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('CreateRecipe')}>
            <View>
              <Icon type="Feather" name="chevron-left" />
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
      <Logo fontSize={25} />
      {hasCreate ? (
        <View style={styles.createContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('CreateRecipe')}>
            <View>
              <Icon type="Feather" name="create-outline" />
            </View>
          </TouchableOpacity>
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

  backContainer: {
    position: 'absolute',
    zIndex: 15,
    left: 20,
    top: 10,
  },

  createContainer: {
    position: 'absolute',
    zIndex: 15,
    right: 20,
    top: 10,
  },
});

export default Header;
