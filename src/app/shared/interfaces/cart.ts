import { Product } from './product';
import { Map } from 'immutable';

export interface Cart {
  readonly items: Map<Product, number>;
}
