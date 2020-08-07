import {Item} from './item';
import {Qualification} from './qualification';

export interface Recipe {
  id: number;
  name: string;
  items: Array<Item>;
  recipe: string;
  image: string;
  qualifications: Array<Qualification>;
  rate: string;
}
