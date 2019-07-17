import { createReducer } from '@ngrx/store';
import { List, Map } from 'immutable';
import { Product } from 'src/app/shared/interfaces/product';

import { ReadonlyProduct } from '../products/readonly-product';
import { AppState } from './app.state';

export const initialState: AppState = Map();

export const reducer = createReducer(initialState);

function updateStock(products: List<Product>) {
  return products.map((item: ReadonlyProduct) =>
    item
      .update('stock', currentStock => currentStock - item.amountInCart)
      .update('amountInCart', () => 0)
  );
}
