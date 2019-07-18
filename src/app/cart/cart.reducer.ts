import { Action, createReducer, on } from '@ngrx/store';
import produce from 'immer';

import { Product } from '../shared/interfaces';
import { SharedActions } from '../shared/state/actions';
import { CartActions } from './cart.actions';

export interface CartState {
  items: Map<string, number>;
}

const initialState: CartState = {
  items: new Map<string, number>()
};

const cartState = createReducer(
  initialState,
  on(SharedActions.selectItem, addToCart),
  on(CartActions.add, addToCart),
  on(CartActions.remove, removeFromCart),
  on(CartActions.empty, emptyCart)
);

function removeFromCart(
  state: CartState,
  { product, amount = 1 }: { product: Product; amount?: number }
) {
  return produce(state, draft => {
    const originalAmount = state.items.get(product.id) || 0;

    if (originalAmount === amount) {
      draft.items.delete(product.id);
    } else if (originalAmount > amount) {
      draft.items.set(product.id, originalAmount - amount);
    } else {
      // ignore
    }
  });
}

function addToCart(state: CartState, { product, amount = 1 }) {
  return produce(state, draft => {
    const originalAmount = state.items.get(product.id) || 0;

    draft.items.set(product.id, originalAmount + amount);
  });
}

function emptyCart(state: CartState) {
  return produce(state, draft => {
    draft.items.clear();
  });
}

export function reducer(state: CartState, action: Action) {
  return cartState(state, action);
}
