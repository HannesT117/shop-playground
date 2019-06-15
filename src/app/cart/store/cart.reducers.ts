import { createReducer, on } from '@ngrx/store';
import { ReadonlyProduct } from 'src/app/products/readonly-product';
import { Product } from 'src/app/shared/interfaces/product';

import * as fromCartActions from './cart.actions';

const mockProduct = new ReadonlyProduct({
  description: 'Some mock description',
  stock: 10
});
const mockProduct2 = new ReadonlyProduct({
  description: 'Some mock description 2',
  stock: 10
});

export interface CartState {
  readonly items: Map<Product, number>;
}

export const initialState: CartState = {
  items: new Map<Product, number>().set(mockProduct, 0).set(mockProduct2, 5)
};

export const reducer = createReducer(
  initialState,
  on(fromCartActions.add, (state, { item }) => ({
    ...state,
    items: state.items.set(item, (state.items.get(item) || 0) + 1)
  })),
  on(fromCartActions.remove, (state, { item }) => ({
    ...state,
    items: state.items.set(item, (state.items.get(item) || 0) - 1)
  })),
  on(fromCartActions.empty, () => ({
    items: new Map()
  }))
);
