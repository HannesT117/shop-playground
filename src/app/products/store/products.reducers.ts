import { createReducer, on } from '@ngrx/store';
import { List, Record } from 'immutable';
import { Product } from 'src/app/shared/interfaces/product';

import { ReadonlyProduct } from '../readonly-product';
import * as fromActions from './products.actions';

export interface ProductsState {
  readonly products: Iterable<Product>;
}

export class ReadonlyProductsState extends Record({ products: List<Product>() })
  implements ProductsState {
  readonly products: List<Product>;
}

export const initialState = new ReadonlyProductsState({
  products: List(
    Array(40)
      .fill('')
      .map(
        (_, index) =>
          new ReadonlyProduct({
            id: index.toString(),
            description: `This is the item with id ${index}`,
            price: (index * 1.5).toString(),
            stock: 10
          })
      )
  )
});

export const reducer = createReducer(
  initialState,
  on(fromActions.reduceStock, reduceStock)
);

function reduceStock(state: ReadonlyProductsState, { product }) {
  const index = state.products.findIndex(item => item.id === product.id);
  const reduceStockByOne = (stock: number): number =>
    stock < 1 ? 0 : stock - 1;

  return state.updateIn(['products', index, 'stock'], reduceStockByOne);
}
