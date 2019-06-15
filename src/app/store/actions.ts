import { createAction, props } from '@ngrx/store';

import { Product } from '../shared/interfaces/product';

export const addToCart = createAction(
  '[Products] Add to cart',
  props<{ product: Product; amount?: number }>()
);

export const removeFromCart = createAction(
  '[Products] Remove from cart',
  props<{ product: Product; amount?: number }>()
);

export const emptyCart = createAction('[Products] Empty cart');
