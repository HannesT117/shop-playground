import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/shared/interfaces/product';

export const add = createAction('[Cart] Add Item', props<{ item: Product }>());
export const remove = createAction(
  '[Cart] Remove Item',
  props<{ item: Product }>()
);
export const empty = createAction('[Cart] Empty Cart');
