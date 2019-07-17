import { Action, createReducer, on } from '@ngrx/store';
import { List, Map } from 'immutable';

import { Address } from '../shared/interfaces';
import * as fromActions from './orders.actions';
import { OrderState } from './orders.state';

const initialState: OrderState = List();
const orderState = createReducer(
  initialState,
  on(
    fromActions.createOrder,
    (state, { address, id }) => createOrder(state, id, address, undefined) // FIXME
  )
);

function createOrder(
  state: OrderState,
  id: string,
  address: Address,
  items: Map<string, number>
): OrderState {
  return state.push({
    id,
    address,
    items
  });
}

export function reducer(state: OrderState, action: Action) {
  return orderState(state, action);
}
