import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MemoizedSelector, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Product } from 'src/app/shared/interfaces/product';
import { ShopState } from 'src/app/store/reducers';
import { click } from 'src/testing';

import { OrderCheckoutComponent } from './order-checkout.component';

describe('OrderCheckoutComponent', () => {
  let page: Page;
  let fixture: ComponentFixture<OrderCheckoutComponent>;

  class Page {
    store: MockStore<ShopState>;
    items: MemoizedSelector<ShopState, Iterable<Product>>;

    get firstName(): DebugElement {
      return this.query('.firstName');
    }

    get surname(): DebugElement {
      return this.query('.surname');
    }

    get street(): DebugElement {
      return this.query('.street');
    }

    get postalCode(): DebugElement {
      return this.query('.postalCode');
    }

    get sum(): DebugElement {
      return this.query('.sum');
    }

    submit(): void {
      const button = this.query('.submit');
      click(button);
    }

    constructor(fix: ComponentFixture<OrderCheckoutComponent>) {
      this.store = fix.debugElement.injector.get(Store) as MockStore<ShopState>;
    }

    query(selector: string): DebugElement {
      return fixture.debugElement.query(By.css(selector));
    }
  }

  function createComponent(): void {
    fixture = TestBed.createComponent(OrderCheckoutComponent);
    page = new Page(fixture);

    fixture.detectChanges();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderCheckoutComponent],
      providers: [provideMockStore()]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display a form to enter the delivery address', () => {});
});
