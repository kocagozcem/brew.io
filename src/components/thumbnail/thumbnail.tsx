import * as React from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Recipe} from '../../models/recipe';

interface Props {
  recipe: Recipe;
}

function Thumbnail(props: Props) {
  const navigation = useNavigation();
  const {recipe} = props;
  const {image} = recipe;
  if (recipe !== null) {
    return (
      <TouchableHighlight
        onPress={() => navigation.navigate('Details', {recipe})}
        style={styles.touchable}
      >
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            {image !== null ? (
              <Image
                source={{
                  uri: image,
                }}
                style={styles.image}
              />
            ) : (
              <Text>error</Text>
            )}
          </View>
          <View style={styles.titleContainer}>
            <Text lineBreakMode="clip" numberOfLines={1} style={styles.title}>
              {recipe.name}
            </Text>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>{recipe.rate}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  return <View />;
}

const styles = StyleSheet.create({
  touchable: {
    width: 120,
    height: 180,
  },
  card: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
  },
  imageContainer: {
    flex: 3,
    alignSelf: 'stretch',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    borderRadius: 15,
  },
  titleContainer: {
    flex: 2,
    alignSelf: 'stretch',
    paddingTop: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scoreContainer: {
    alignSelf: 'stretch',
    alignItems: 'flex-end',
  },
  scoreText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Thumbnail;
