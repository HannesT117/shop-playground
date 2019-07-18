import { createAction, props } from '@ngrx/store';

import { Product } from '../interfaces';

const selectItem = createAction(
  '[Shop] Select',
  props<{ product: Product; amount?: number }>()
);

export const SharedActions = { selectItem };
