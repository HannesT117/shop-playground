import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MemoizedSelector, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { List } from 'immutable';
import { ReadonlyProduct } from 'src/app/products/readonly-product';
import { Product } from 'src/app/shared/interfaces/product';
import { ShopState } from 'src/app/store/reducers';
import { getItemsInCart, getSumOfCart } from 'src/app/store/selectors';
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
          stock: 10,
          amountInCart: 0
        })
    )
);

describe('ProductListComponent', () => {
  let page: Page;
  let fixture: ComponentFixture<CartDetailComponent>;
  let component: CartDetailComponent;

  class Page {
    products: MemoizedSelector<ShopState, List<Product>>;
    dispatcherSpy: jest.SpyInstance;
    navigateSpy: jest.SpyInstance;

    get productElements(): List<Product> {
      return fixture.debugElement.query(By.css('app-item-summary')).properties
        .items;
    }

    get checkoutButton(): DebugElement {
      return fixture.debugElement.query(By.css('.checkout'));
    }

    get sum(): string {
      return fixture.debugElement.query(By.css('.sum')).nativeElement.innerHTML;
    }

    click(product: DebugElement) {
      const button = product.nativeElement.querySelector('button');
      click(button);
    }

    constructor() {
      const store = TestBed.get(Store) as MockStore<ShopState>;
      const router = TestBed.get(Router);

      this.products = store.overrideSelector(getItemsInCart, List());
      store.overrideSelector(getSumOfCart, 5);

      this.dispatcherSpy = jest.spyOn(store, 'dispatch');
      this.navigateSpy = jest.spyOn(router, 'navigate').mockImplementation();
    }
  }

  function createComponent(): void {
    fixture = TestBed.createComponent(CartDetailComponent);
    component = fixture.componentInstance;
    page = new Page();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CartDetailComponent],
      providers: [provideMockStore()],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.debugElement.componentInstance).toBeTruthy();
  });

  it('should hide checkout button when cart is empty', () => {
    fixture.detectChanges();

    expect(page.checkoutButton).toBeFalsy();
  });

  it('should display summary when items in cart', () => {
    page.products.setResult(mockData);
    fixture.detectChanges();

    expect(page.productElements.size).toBe(10);
    expect(page.sum).toBe('€5.00');
    expect(page.checkoutButton).toBeTruthy();
  });

  it('should navigate to orders on checkout click', () => {
    page.products.setResult(mockData);
    fixture.detectChanges();

    click(page.checkoutButton);
    fixture.detectChanges();

    expect(page.navigateSpy).toHaveBeenCalledWith(['/orders']);
  });

  it('should decrement items for numbers smaller than current amount', () => {
    const event = { item: { amountInCart: 5 }, amount: 3 } as any;

    component.changeAmount(event);

    expect(page.dispatcherSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 2,
        type: '[Products] Remove from cart'
      })
    );
  });

  it('should increment items for numbers bigger than current amount', () => {
    const event = { item: { amountInCart: 5 }, amount: 8 } as any;

    component.changeAmount(event);

    expect(page.dispatcherSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 3,
        type: '[Products] Add to cart'
      })
    );
  });
});
