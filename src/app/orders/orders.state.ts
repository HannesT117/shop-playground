import { List, Map } from 'immutable';

import { Address } from '../shared/interfaces';

export type OrderState = List<{
  id: string;
  address: Address;
  items: Map<string, number>;
}>;
