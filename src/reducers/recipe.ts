import {Action} from '../models/action';
import mockData from '../mock/mock-recipe.json';

export default (state = {recipes: mockData}, action: Action) => {
  switch (action.type) {
    case 'SET_RECIPE':
      return {...state, recipes: action.value};
    default:
      return state;
  }
};
