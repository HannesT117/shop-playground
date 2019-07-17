import { Action, createReducer, on } from '@ngrx/store';
import { Map } from 'immutable';

import * as fromActions from './cart.actions';
import { CartState } from './cart.state';

const initialState: CartState = Map();
const cartState = createReducer(
  initialState,
  on(fromActions.add, addToCart),
  on(fromActions.remove, removeFromCart),
  on(fromActions.empty, emptyCart)
);

function removeFromCart(state: CartState, { product, amount = 1 }) {
  const [key, value] = state.findEntry(id => id === product.id);

  if (value === 1) {
    state.remove(key);
  } else {
    return state.set(key, value - 1);
  }
}

function addToCart(state: CartState, { product, amount = 1 }) {
  const [key, value] = state.findEntry((_, id) => id === product.id);

  if (!key) {
    return state;
  }

  return state.set(key, value + amount);
}

function emptyCart(state: CartState) {
  return state.clear();
}

export function reducer(state: CartState, action: Action) {
  return cartState(state, action);
}
