import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { Order } from '../shared/interfaces';

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>();
