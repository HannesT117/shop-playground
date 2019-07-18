import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { Address, Order, Product } from '../shared/interfaces';
import * as fromActions from './orders.actions';

export interface OrderState extends EntityState<Order> {
  currentOrder: string | null;
}

const adapter: EntityAdapter<Order> = createEntityAdapter<Order>();
const initialState: OrderState = adapter.getInitialState({
  currentOrder: null
});

const orderState = createReducer(
  initialState,
  on(
    fromActions.createOrder,
    (state, { address, id }) => createOrder(state, id, address, []) // FIXME
  )
);

function createOrder(
  state: OrderState,
  id: string,
  address: Address,
  items: Product[]
): OrderState {
  return adapter.addOne({ id, address, items }, state);
}

export function reducer(state: OrderState, action: Action) {
  return orderState(state, action);
}
