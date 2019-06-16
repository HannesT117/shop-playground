import { createFeatureSelector, createSelector } from '@ngrx/store';
import { List } from 'immutable';

import { Product } from '../shared/interfaces/product';
import { ShopState } from './reducers';

export const productsState = createFeatureSelector<ShopState>('shop');

export const getProducts = createSelector(
  productsState,
  state => state.products
);

export const getItemsInCart = createSelector(
  productsState,
  state =>
    (state.products as List<Product>).filter(
      product => product.amountInCart > 0
    )
);

export const getSumOfCart = createSelector(
  getItemsInCart,
  items =>
    items
      .map(item => item.amountInCart * +item.price)
      .reduce((acc, curr) => acc + curr, 0)
);
