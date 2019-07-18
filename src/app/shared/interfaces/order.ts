import { Address } from './address';
import { Product } from './product';

export interface Order {
  id: string;
  items: Array<Product>;
  address: Address;
}
