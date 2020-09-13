import {Action} from '../models/action';
import mockData from '../mock/mock-recipe.json';
import {Recipe} from '../models/recipe';

export default (state = {recipes: mockData}, action: Action) => {
  switch (action.type) {
    case 'SET_RECIPE':
      return {...state, recipes: action.value};
    case 'ADD_RECIPE':
      return {...state, recipes: prepareRecipeToAdd(state.recipes, action.value)};
    default:
      return state;
  }
};

function prepareRecipeToAdd(recipes: Recipe[], value: Recipe) {
  const recipeList: Recipe[] = recipes;
  recipeList.push(value);
  return recipeList;
}
