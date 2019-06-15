import { Injectable } from '@angular/core';
import { Product } from '../shared/interfaces/product';
import { Observable, BehaviorSubject } from 'rxjs';
import { List } from 'immutable';
import { map } from 'rxjs/operators';
import { ReadonlyProduct } from './readonly-product';

const mockData = List(
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

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products$ = new BehaviorSubject<List<Product>>(mockData);

  fetchProducts(): Observable<Iterable<Product>> {
    return this.products$.pipe(map(products => products));
  }

  select(product: Product): void {
    this.reduceStock(product);
  }

  reduceStock(product: Product): void {
    const products = this.products$.getValue();
    const index = products.findIndex(item => item.id === product.id);

    if (index === -1) {
      throw Error(`Item with id ${product.id} not found in list.`);
    }
    const productInList = products.get(index);
    if (!productInList || productInList.stock < 1) {
      throw Error('Stock already empty');
    }

    const reduceStock = (item: ReadonlyProduct) =>
      item.set('stock', item.stock - 1);
    this.products$.next(products.update(index, reduceStock));
  }
}
