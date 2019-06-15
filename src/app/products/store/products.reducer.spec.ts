import { List } from 'immutable';

import { ReadonlyProduct } from '../readonly-product';
import * as fromActions from './products.actions';
import * as fromProducts from './products.reducers';

const mockProducts: List<ReadonlyProduct> = List(
  Array(40)
    .fill('')
    .map(
      (_, index) =>
        new ReadonlyProduct({
          id: index.toString(),
          description: `This is the item with id ${index}`,
          price: (index * 1.5).toString(),
          stock: 10
        })
    )
);

describe('ProductsReducer', () => {
  it('should return the initial products', () => {
    const { initialState } = fromProducts;
    const action = {};

    const state = fromProducts.reducer(undefined, action as any);

    expect(state).toBe(initialState);
  });

  it('should reduce the stock of the given product', () => {
    const products = mockProducts.update(5, item => item.set('stock', 99));
    const product = products.get(5);
    const action = fromActions.reduceStock({ product });
    const initialState = new fromProducts.ReadonlyProductsState({ products });

    const state = fromProducts.reducer(initialState, action);

    expect(state.products.get(5).stock).toBe(98);
  });

  it('should not decrement an empty stock', () => {
    const products = mockProducts.update(5, item => item.set('stock', 0));
    const product = products.get(5);
    const action = fromActions.reduceStock({ product });
    const initialState = new fromProducts.ReadonlyProductsState({ products });

    const state = fromProducts.reducer(initialState, action);

    expect(state.getIn(['products', 5, 'stock'])).toBe(0);
  });
});
