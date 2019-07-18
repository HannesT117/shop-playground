import { createAction, props } from '@ngrx/store';

import { Product } from '../shared/interfaces';

const add = createAction(
  '[Cart] Add',
  props<{ product: Product; amount?: number }>()
);

const remove = createAction(
  '[Cart] Remove element',
  props<{ product: Product; amount?: number }>()
);

const empty = createAction('[Cart] Empty');

export const CartActions = { add, remove, empty };
