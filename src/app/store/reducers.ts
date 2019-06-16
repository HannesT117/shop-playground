import { createReducer, on } from '@ngrx/store';
import { List, Record } from 'immutable';
import { Product } from 'src/app/shared/interfaces/product';

import { ReadonlyProduct } from '../products/readonly-product';
import { Order } from '../shared/interfaces';
import * as fromActions from './actions';

export interface ShopState {
  readonly products: Iterable<Product>;
  readonly orders: Iterable<Order>;
}

export class ImmutableShopState
  extends Record({ products: List<Product>(), orders: List<Order>() })
  implements ShopState {
  readonly products: List<Product>;
  readonly order: List<Order>;
}

export const initialState = new ImmutableShopState({
  products: List(
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
  ),
  orders: List()
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
  ),
  on(fromActions.createOrder, (state: ImmutableShopState, { address, id }) => {
    return state.update('orders', orders =>
      orders.push({
        address,
        id,
        items: state.products.filter(item => item.amountInCart > 0)
      })
    );
  })
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
