import { EntityState } from '@ngrx/entity';
import { Action, createReducer } from '@ngrx/store';

import { Product } from '../shared/interfaces';
import { mockItems } from './mock-items';
import { adapter } from './products.adapter';

export interface ShopState extends EntityState<Product> {}

const initialState: ShopState = adapter.addMany(
  mockItems,
  adapter.getInitialState()
);

const shopReducer = createReducer(initialState);

export function reducer(state: ShopState | undefined, action: Action) {
  return shopReducer(state, action);
}
