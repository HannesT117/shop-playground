import { Action, createReducer } from '@ngrx/store';
import { List } from 'immutable';

import { ProductState } from './products.state';
import { ReadonlyProduct } from './readonly-product';

const initialState: ProductState = List(
  Array(40)
    .fill('')
    .map(
      (_, index) =>
        new ReadonlyProduct({
          id: index.toString(),
          description: `Item ${index}`,
          price: (Math.random() * Math.floor(1000)).toFixed(2).toString(),
          stock: Math.floor(Math.random() * Math.floor(30)),
          amountInCart: 0
        })
    )
);

const productReducer = createReducer(initialState);

export function reducer(state: ProductState | undefined, action: Action) {
  return productReducer(state, action);
}
