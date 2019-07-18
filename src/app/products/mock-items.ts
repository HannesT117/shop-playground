import { Product } from '../shared/interfaces';

export const mockItems: Product[] = Array(40)
  .fill('')
  .map((_, index) => ({
    id: index.toString(),
    description: `Item ${index}`,
    price: (Math.random() * Math.floor(1000)).toFixed(2).toString(),
    stock: Math.floor(Math.random() * Math.floor(30)),
    amountInCart: 0
  }));
