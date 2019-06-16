import { getItemsInCart, getSumOfCart } from './selectors';

const store = {
  products: [
    {
      amountInCart: 3,
      price: 5
    },
    {
      amountInCart: 0,
      price: 10
    },
    {
      amountInCart: 5,
      price: 5.5
    }
  ]
};

describe('Selectors', () => {
  it('should return cart items', () => {
    expect(getItemsInCart.projector(store)).toEqual([
      { amountInCart: 3, price: 5 },
      { amountInCart: 5, price: 5.5 }
    ]);
  });

  it('should calculate sum of cart items', () => {
    expect(getSumOfCart.projector(store.products)).toBe(42.5);
  });
});
