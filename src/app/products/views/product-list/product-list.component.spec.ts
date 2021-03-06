import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MemoizedSelector, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { List } from 'immutable';
import { ShopState } from 'src/app/store/reducers';
import { click } from 'src/testing';

import { Product } from '../../../shared/interfaces/product';
import * as fromRoot from '../../../store/selectors';
import { ReadonlyProduct } from '../../readonly-product';
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
          stock: 10,
          amountInCart: 8
        })
    )
);

describe('ProductListComponent', () => {
  let page: Page;
  let fixture: ComponentFixture<ProductListComponent>;

  class Page {
    store: MockStore<ShopState>;
    items: MemoizedSelector<ShopState, Iterable<Product>>;

    get products(): Array<DebugElement> {
      return fixture.debugElement.queryAll(By.css('.product'));
    }

    click(product: DebugElement) {
      const button = product.nativeElement.querySelector('button');
      click(button);
    }

    constructor(fix: ComponentFixture<ProductListComponent>) {
      this.store = fix.debugElement.injector.get(Store) as MockStore<ShopState>;
    }
  }

  function createComponent(): void {
    fixture = TestBed.createComponent(ProductListComponent);
    page = new Page(fixture);

    page.items = page.store.overrideSelector(fromRoot.getProducts, mockData);
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
      const extract = (cssClass: string) =>
        item.nativeElement.querySelector(cssClass).innerHTML;

      const description = extract('.description');
      const price = extract('.price');
      const stock = extract('.available');

      expect(description).toBe(`This is the item with id ${index}`);
      expect(price).toBe(`${index + 1.5}`);
      expect(stock).toBe('2');
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
