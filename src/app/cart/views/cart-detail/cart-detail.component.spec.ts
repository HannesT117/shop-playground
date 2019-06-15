import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { List } from 'immutable';
import { ReadonlyProduct } from 'src/app/products/readonly-product';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductsState } from 'src/app/store/reducers';
import { click } from 'src/testing';

import { CartDetailComponent } from './cart-detail.component';

const mockData: List<Product> = List(
  Array(10)
    .fill('')
    .map(
      (_, index) =>
        new ReadonlyProduct({
          id: index.toString(),
          description: `This is the item with id ${index}`,
          price: (index + 1.5).toString(),
          initialStock: 10,
          amountInCart: 0
        })
    )
);

describe('ProductListComponent', () => {
  let page: Page;
  let fixture: ComponentFixture<CartDetailComponent>;

  class Page {
    store: MockStore<ProductsState>;

    get products(): Array<DebugElement> {
      return fixture.debugElement.queryAll(By.css('.product'));
    }

    click(product: DebugElement) {
      const button = product.nativeElement.querySelector('button');
      click(button);
    }

    constructor(fix: ComponentFixture<CartDetailComponent>) {
      this.store = fix.debugElement.injector.get(Store) as MockStore<
        ProductsState
      >;
    }
  }

  function createComponent(): void {
    fixture = TestBed.createComponent(CartDetailComponent);
    page = new Page(fixture);

    // page.store.overrideSelector(fromCart.getItems, mockData);
    fixture.detectChanges();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CartDetailComponent],
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
});
