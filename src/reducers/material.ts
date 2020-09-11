import {MaterialAction} from '../models/material-action';
import mockData from '../mock/mock-materials.json';

export default (state = {materials: mockData}, action: MaterialAction) => {
  switch (action.type) {
    case 'SET_MATERIAL':
      return {...state, materials: action.value};
    default:
      return state;
  }
};
