import { Record } from 'immutable';

import { Product } from '../shared/interfaces/product';

export class ReadonlyProduct
  extends Record({
    id: '-1',
    price: '',
    description: '',
    stock: 0
  })
  implements Product {
  readonly id: string;
  readonly price: string;
  readonly description: string;
  readonly stock: number;
}
