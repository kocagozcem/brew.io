import * as React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
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
  const globalRecipes = useSelector((state: RootStateOrAny) => state.recipe);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setRecipes(globalRecipes.recipes);
    setFilteredRecipes(recipes);
    setIsLoading(false);
  }, [recipes]);

  function search(val: string) {
    if (val.length > 0) {
      let filtered = [...globalRecipes.recipes];
      filtered = filtered.filter((recipe) => recipe.name.toLowerCase().includes(val.toLowerCase()));
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
      <Header hasCreate hasBackButton={false} logoFontsize={25} />
      <SearchBar valInput={(val: string) => search(val)} />
      <View style={styles.content}>
        {filteredRecipes.map((recipe) => {
          return (
            <View style={styles.thumbnailContainer} key={recipe.id}>
              <Thumbnail recipe={recipe} />
            </View>
          );
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
    flexDirection: 'row',
  },

  thumbnailContainer: {
    width: Dimensions.get('window').width / 3 - 5,
  },
});

export default HomeScreen;
