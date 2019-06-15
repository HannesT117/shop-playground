import { TestBed } from '@angular/core/testing';
import { take, finalize } from 'rxjs/operators';
import { ProductsService } from './products.service';
import { Product } from '../shared/interfaces/product';
import { List } from 'immutable';
import { ReadonlyProduct } from './readonly-product';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [ProductsService]
    })
  );

  beforeEach(() => {
    service = TestBed.get(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an observable emitting mock products', done => {
    service.fetchProducts().subscribe((data: List<Product>) => {
      expect(data.size).toBe(40);

      done();
    });
  });

  describe('when selecting a product', () => {
    it('should throw an error if product not in products list', () => {
      expect(() =>
        service.select(new ReadonlyProduct({ id: '-1' } as any))
      ).toThrowError();
    });

    it('should throw an error if stock is already empty', () => {
      const product = new ReadonlyProduct({ id: '0' } as any);

      for (let i = 0; i < 10; i++) {
        service.select(product);
      }

      expect(() => service.select(product)).toThrowError();
    });

    it('should update the product\'s stock in product list', done => {
      let result;
      service
        .fetchProducts()
        .pipe(
          take(2),
          finalize(done)
        )
        .subscribe((products: List<Product>) => {
          result = products.get(1).stock;
        });

      service.select(new ReadonlyProduct({ id: '1' } as any));

      expect(result).toBe(9);
    });

    it('should ');
  });
});
