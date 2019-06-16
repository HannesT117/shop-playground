import { List } from 'immutable';

import { ReadonlyProduct } from '../products/readonly-product';
import * as fromActions from './actions';
import * as fromProducts from './reducers';

const mockProducts: List<ReadonlyProduct> = List(
  Array(40)
    .fill('')
    .map(
      (_, index) =>
        new ReadonlyProduct({
          id: index.toString(),
          description: `This is the item with id ${index}`,
          price: (index * 1.5).toString(),
          stock: 10,
          amountInCart: 0
        })
    )
);

describe('Reducer', () => {
  it('should return the initial products', () => {
    const { initialState } = fromProducts;
    const action = {};

    const state = fromProducts.reducer(undefined, action as any);

    expect(state).toBe(initialState);
  });

  it('should remove items of the given product', () => {
    const products = mockProducts.update(5, item =>
      item.set('amountInCart', 99)
    );
    const initialState = new fromProducts.ImmutableShopState({ products });
    const action = fromActions.removeFromCart({
      product: products.get(5)
    });

    const state = fromProducts.reducer(initialState, action);

    expect(state.products.get(5).amountInCart).toBe(98);
  });

  it('should not remove when already empty', () => {
    const products = mockProducts.update(5, item =>
      item.set('amountInCart', 0)
    );
    const initialState = new fromProducts.ImmutableShopState({ products });
    const action = fromActions.removeFromCart({
      product: products.get(5)
    });

    const state = fromProducts.reducer(initialState, action);

    expect(state.products.get(5).amountInCart).toBe(0);
  });

  it('should not add more items to cart than available', () => {
    const products = mockProducts.update(5, item =>
      item.set('stock', 10).set('amountInCart', 9)
    );
    const initialState = new fromProducts.ImmutableShopState({ products });
    const action = fromActions.addToCart({
      product: products.get(5),
      amount: 2
    });

    const state = fromProducts.reducer(initialState, action);

    expect(state.getIn(['products', 5, 'amountInCart'])).toBe(10);
  });
});
