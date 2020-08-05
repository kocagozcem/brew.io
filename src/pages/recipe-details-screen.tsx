import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import HeaderImageScrollView, {TriggeringView} from 'react-native-image-header-scroll-view';
import {Icon} from 'native-base';
import * as Animatable from 'react-native-animatable';
import colors from '../assets/colors';
import Percantage from '../components/percantage/percantage';

interface Item {
  amount: string;
  item: string;
}

interface Qualification {
  name: string;
  value: number;
}

interface Recipe {
  name: string;
  items: Array<Item>;
  recipe: string;
  image: string;
  qualifications: Array<Qualification>;
}

const recipe: Recipe = {
  name: 'Latte matte falan işte',
  items: [
    {amount: '2 table spoon', item: 'grinded espresso'},
    {amount: '30cl', item: 'soy milk'},
    {amount: '1 tea spoon', item: 'brown sugar'},
  ],
  recipe:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  image: 'images.jpg',
  qualifications: [
    {
      name: 'Intensity',
      value: 3,
    },
    {
      name: 'Cost',
      value: 2,
    },
    {
      name: 'Attainability',
      value: 5,
    },
  ],
};

function recipeItem(amount: string, item: string) {
  return (
    <View style={styles.itemContainer} key={item}>
      <Icon type="FontAwesome5" name="mug-hot" style={styles.itemIcon} />
      <Text style={styles.amountText}>{`${amount} `}</Text>
      <Text style={styles.itemText}>{item}</Text>
    </View>
  );
}

function qualifications() {
  return (
    <View style={styles.qualificationsContainer}>
      {recipe.qualifications.map((qualification: Qualification) => (
        <View style={styles.qualification} key={qualification.name}>
          <Percantage val={qualification.value} max={5} size={70} lineWidth="1" />
          <Text style={styles.qualificationText}>{qualification.name}</Text>
        </View>
      ))}
    </View>
  );
}

function recipeContext() {
  return (
    <View style={styles.context}>
      {qualifications()}
      {recipe.items.map((item) => recipeItem(item.amount, item.item))}
      <View style={styles.recipeDetailsContainer}>
        <Text style={styles.recipeDetails}>{recipe.recipe}</Text>
      </View>
    </View>
  );
}

function foreground() {
  return (
    <View style={styles.foregroundContainer}>
      <Text style={[styles.headline, {color: colors.white, textShadowColor: colors.shadow}]}>
        {recipe.name}
      </Text>
    </View>
  );
}

function RecipeDetailsScreen() {
  // let navTitleView;
  const navTitleView = React.useRef(null);
  return (
    <View style={styles.container}>
      <HeaderImageScrollView
        maxHeight={250}
        minHeight={50}
        maxOverlayOpacity={0.6}
        minOverlayOpacity={0.3}
        fadeOutForeground
        // eslint-disable-next-line global-require
        headerImage={require('../assets/images/images.jpg')}
        // eslint-disable-next-line react/jsx-closing-bracket-location
        renderFixedForeground={() => (
          <Animatable.View style={styles.navTitleView} ref={navTitleView}>
            <Text style={styles.navTitle}>{recipe.name}</Text>
          </Animatable.View>
        )}
        renderForeground={() => foreground()}>
        <View style={styles.content}>
          <TriggeringView
            onHide={() => navTitleView.current.fadeInUp(200)}
            onDisplay={() => navTitleView.current.fadeOut(100)}>
            {recipeContext()}
          </TriggeringView>
        </View>
      </HeaderImageScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  foregroundContainer: {height: 300, justifyContent: 'center', alignItems: 'center'},
  content: {
    height: 1000,
  },
  context: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 80,
  },
  headline: {
    fontSize: 26,
    fontWeight: '700',
    marginVertical: 10,
    textShadowOffset: {width: -5, height: 5},
    textShadowRadius: 20,
  },
  recipeDetailsContainer: {
    alignSelf: 'stretch',
    paddingHorizontal: 10,
  },
  recipeDetails: {
    marginTop: 20,
    fontSize: 15,
    lineHeight: 32,
    color: '#121010',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 34,
  },
  itemIcon: {
    fontSize: 13,
    marginLeft: 10,
    marginRight: 10,
  },
  amountText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  itemText: {
    fontSize: 15,
  },
  qualificationsContainer: {
    alignSelf: 'stretch',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginBottom: 30,
  },
  qualification: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  qualificationText: {
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },

  navTitleView: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    opacity: 0,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
});

export default RecipeDetailsScreen;
