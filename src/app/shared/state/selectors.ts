import { createFeatureSelector } from '@ngrx/store';

import { ShopState } from '../../products/products.reducer';

export const shopState = createFeatureSelector<ShopState>('shop');
