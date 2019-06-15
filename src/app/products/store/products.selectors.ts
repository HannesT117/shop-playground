import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProductsState } from './products.reducers';

export const productsState = createFeatureSelector<ProductsState>('products');

export const getProducts = createSelector(
  productsState,
  state => state.products
);
