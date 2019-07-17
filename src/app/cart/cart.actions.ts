import { createAction, props } from '@ngrx/store';

import { Product } from '../shared/interfaces';

export const add = createAction(
  '[Cart] Add',
  props<{ product: Product; amount?: number }>()
);

export const remove = createAction(
  '[Cart] Remove element',
  props<{ product: Product; amount?: number }>()
);

export const empty = createAction('[Cart] Empty');
