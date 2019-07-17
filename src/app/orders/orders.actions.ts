import { createAction } from '@ngrx/store';
import { v4 as uuid } from 'uuid';

import { Address } from '../shared/interfaces';

export const createOrder = createAction(
  '[Products] Create order',
  (address: Address) => ({ address, id: uuid() })
);
