import {Recipe} from './recipe';

export interface Action {
  type: string;
  value: Recipe;
}
