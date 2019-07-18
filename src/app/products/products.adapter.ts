import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { Product } from '../shared/interfaces';

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();
