import {combineReducers} from 'redux';
import recipe from './recipe';
import material from './material';

export default combineReducers({
  recipe,
  material,
});
