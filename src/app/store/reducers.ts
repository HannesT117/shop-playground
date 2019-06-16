import { createReducer, on } from '@ngrx/store';
import { List, Record } from 'immutable';
import { Product } from 'src/app/shared/interfaces/product';

import { ReadonlyProduct } from '../products/readonly-product';
import * as fromActions from './actions';

export interface ShopState {
  readonly products: Iterable<Product>;
}

export class ImmutableShopState extends Record({ products: List<Product>() })
  implements ShopState {
  readonly products: List<Product>;
}

export const initialState = new ImmutableShopState({
  products: List(
    Array(40)
      .fill('')
      .map(
        (_, index) =>
          new ReadonlyProduct({
            id: index.toString(),
            description: `This is the item with id ${index}`,
            price: (index * 1.5).toString(),
            stock: 10,
            amountInCart: 0
          })
      )
  )
});

export const reducer = createReducer(
  initialState,
  on(fromActions.addToCart, addToCart),
  on(fromActions.removeFromCart, removeFromCart),
  on(fromActions.emptyCart, state =>
    state.update('products', products =>
      products.map((product: ReadonlyProduct) =>
        product.update('amountInCart', () => 0)
      )
    )
  )
);

function removeFromCart(state: ImmutableShopState, { product, amount = 1 }) {
  const index = state.products.findIndex(item => item.id === product.id);

  return state.updateIn(['products', index, 'amountInCart'], currentAmount =>
    currentAmount - amount < 1 ? 0 : currentAmount - amount
  );
}

function addToCart(state: ImmutableShopState, { product, amount = 1 }) {
  const index = state.products.findIndex(item => item.id === product.id);
  const productInList = state.products.get(index);

  if (!productInList) {
    return state;
  }

  return state.updateIn(['products', index, 'amountInCart'], amountInCart =>
    amountInCart + amount > productInList.stock
      ? productInList.stock
      : amountInCart + amount
  );
}
