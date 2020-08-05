import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './pages/homescreen';
import RecipeDetailsScreen from './pages/recipe-details-screen';

declare const global: {HermesInternal: null | {}};

const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    dark: false,
    background: '#fff',
    primary: '#e3dfc8',
    border: '#d4d4d4',
  },
};

const Stack = createStackNavigator();
const noHeaderOption = {
  headerShown: false,
};

const transparentHeaderOption = {
  headerTransparent: true,
  headerTintColor: '#fff',
  title: '',
};

const App = () => {
  return (
    <NavigationContainer theme={myTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={noHeaderOption} component={HomeScreen} />
        <Stack.Screen
          name="Details"
          options={transparentHeaderOption}
          component={RecipeDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
