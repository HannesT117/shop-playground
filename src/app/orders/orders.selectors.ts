import { createFeatureSelector } from '@ngrx/store';

import { OrderState } from './orders.reducer';

export const orderState = createFeatureSelector<OrderState>('orders');
export const getCurrentOrder = (state: OrderState) => state.currentOrder;
