import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useSelector, RootStateOrAny} from 'react-redux';
import Header from '../components/header/header';
import SearchBar from '../components/search-bar/search-bar';
import Thumbnail from '../components/thumbnail/thumbnail';
import {Recipe} from '../models/recipe';

function HomeScreen() {
  const {colors} = useTheme();
  const [recipes, setRecipes] = React.useState<Array<Recipe>>([]);
  const [filteredRecipes, setFilteredRecipes] = React.useState<Array<Recipe>>([]);
  const deneme = useSelector((state: RootStateOrAny) => state.recipe);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setRecipes(deneme.recipes);
    setFilteredRecipes(recipes);
    setIsLoading(false);
  }, [recipes]);

  function search(val: string) {
    if (val.length > 0) {
      let filtered = [...recipes];
      filtered = filtered.filter((recipe) => recipe.name.toLowerCase().includes(val));
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(recipes);
    }
  }

  if (isLoading) {
    return <View />;
  }

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Header />
      <SearchBar valInput={(val: string) => search(val)} />
      <View style={styles.content}>
        {filteredRecipes.map((recipe) => {
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
