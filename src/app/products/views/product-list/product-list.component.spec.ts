import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { List } from 'immutable';
import { click } from 'src/testing';

import { Product } from '../../../shared/interfaces/product';
import { ReadonlyProduct } from '../../readonly-product';
import { ProductsState } from '../../store/products.reducers';
import * as fromProducts from '../../store/products.selectors';
import { ProductListComponent } from './product-list.component';

const mockData: List<Product> = List(
  Array(10)
    .fill('')
    .map(
      (_, index) =>
        new ReadonlyProduct({
          id: index.toString(),
          description: `This is the item with id ${index}`,
          price: (index + 1.5).toString(),
          stock: 10
        })
    )
);

describe('ProductListComponent', () => {
  let page: Page;
  let fixture: ComponentFixture<ProductListComponent>;

  class Page {
    store: MockStore<ProductsState>;

    get products(): Array<DebugElement> {
      return fixture.debugElement.queryAll(By.css('.product'));
    }

    click(product: DebugElement) {
      const button = product.nativeElement.querySelector('button');
      click(button);
    }

    constructor(fix: ComponentFixture<ProductListComponent>) {
      this.store = fix.debugElement.injector.get(Store) as MockStore<
        ProductsState
      >;
    }
  }

  function createComponent(): void {
    fixture = TestBed.createComponent(ProductListComponent);
    page = new Page(fixture);

    page.store.overrideSelector(fromProducts.getProducts, mockData);
    fixture.detectChanges();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [provideMockStore()]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should create', () => {
    expect(fixture.debugElement.componentInstance).toBeTruthy();
  });

  it('should display products', () => {
    expect(page.products.length).toBe(10);
    page.products.forEach((item, index) => {
      expect(item.children[0].nativeElement.innerHTML).toBe(
        `This is the item with id ${index}`
      );
      expect(item.children[1].nativeElement.innerHTML).toBe(`${index + 1.5}`);
      expect(item.children[2].nativeElement.innerHTML).toBe('10');
    });
  });

  it('should pass selected products to the service', () => {
    const dispatchSpy = jest.spyOn(page.store, 'dispatch');
    page.click(page.products[1]);
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ product: mockData.get(1) })
    );
  });
});
