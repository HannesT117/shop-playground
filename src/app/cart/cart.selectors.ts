import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CartState } from './cart.reducer';

export const cartState = createFeatureSelector<CartState>('cart');

export const selectItems = createSelector(
  cartState,
  state => state.items
);

export const getSum = createSelector(
  cartState,
  state => state.items
);

export const getItemsInCart = createSelector(
  cartState,
  state => state.items
);

export const getSumOfCart = createSelector(
  getItemsInCart,
  items => items
  //   .map(item => item.amountInCart * +item.price)
  //   .reduce((acc, curr) => acc + curr, 0)
);
