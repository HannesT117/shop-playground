import { Address } from './address';
import { Product } from './product';

export interface Order {
  id: string;
  items: Iterable<Product>;
  address: Address;
}
