import { createFeatureSelector, createSelector } from '@ngrx/store';

import { adapter } from './products.adapter';
import { ShopState } from './products.reducer';

export const shopState = createFeatureSelector<ShopState>('shop');

export const getAllItems = createSelector(
  shopState,
  adapter.getSelectors().selectAll
);
