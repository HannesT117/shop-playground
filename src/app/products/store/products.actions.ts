import { createAction, props } from '@ngrx/store';

import { Product } from '../../shared/interfaces/product';

export const reduceStock = createAction(
  '[Products] Reduce Stock',
  props<{ product: Product }>()
);
