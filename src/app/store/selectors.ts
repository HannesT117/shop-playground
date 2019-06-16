import { createFeatureSelector, createSelector } from '@ngrx/store';
import { List } from 'immutable';

import { Product } from '../shared/interfaces/product';
import { ShopState } from './reducers';

export const shopState = createFeatureSelector<ShopState>('shop');

export const getProducts = createSelector(
  shopState,
  state => state.products
);

export const getOrders = createSelector(
  shopState,
  state => state.orders
);

export const getItemsInCart = createSelector(
  shopState,
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

export const getCartSummary = createSelector(
  getItemsInCart,
  getSumOfCart,
  (items, sum) => ({ items, sum })
);
