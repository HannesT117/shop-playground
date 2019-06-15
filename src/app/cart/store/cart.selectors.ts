import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CartState } from './cart.reducers';

export const cartState = createFeatureSelector<CartState>('cart');

export const getItems = createSelector(
  cartState,
  state => state.items
);
