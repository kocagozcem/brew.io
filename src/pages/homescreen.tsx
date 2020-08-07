import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Header from '../components/header/header';
import SearchBar from '../components/search-bar/search-bar';
import Thumbnail from '../components/thumbnail/thumbnail';
import {Recipe} from '../models/recipe';
import mockData from '../mock/mock-recipe.json';

function HomeScreen() {
  const {colors} = useTheme();
  const recipes: Array<Recipe> = mockData;
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Header />
      <SearchBar />
      <View style={styles.content}>
        {recipes.map((recipe) => {
          return <Thumbnail recipe={recipe} key={recipe.id} />;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 15,
  },
});

export default HomeScreen;
