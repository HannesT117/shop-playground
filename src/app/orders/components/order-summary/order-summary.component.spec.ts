import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MemoizedSelector } from '@ngrx/store';
import { List } from 'immutable';
import { ReadonlyProduct } from 'src/app/products/readonly-product';
import { Product } from 'src/app/shared/interfaces';
import { ShopState } from 'src/app/store/reducers';

import { OrderSummaryComponent } from './order-summary.component';

const mockData: List<Product> = List(
  Array(10)
    .fill('')
    .map(
      (_, index) =>
        new ReadonlyProduct({
          id: index.toString(),
          description: `This is the item with id ${index}`,
          price: (1.5).toString(),
          stock: 10,
          amountInCart: 4
        })
    )
);

describe('OrderSummaryComponent', () => {
  let page: Page;
  let fixture: ComponentFixture<OrderSummaryComponent>;
  let component: OrderSummaryComponent;

  class Page {
    products: MemoizedSelector<ShopState, List<Product>>;

    get itemRows(): Array<DebugElement> {
      return fixture.debugElement.query(By.css('tbody')).queryAll(By.css('tr'));
    }
  }

  function createComponent(): void {
    fixture = TestBed.createComponent(OrderSummaryComponent);
    component = fixture.componentInstance;
    page = new Page();
    fixture.detectChanges();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderSummaryComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should create', () => {
    expect(fixture.debugElement.componentInstance).toBeTruthy();
  });

  it('should display all items in cart', () => {
    component.items = mockData;
    fixture.detectChanges();

    expect(page.itemRows.length).toBe(10);
  });

  it('should calculate the costs for one product', () => {
    component.items = mockData;
    fixture.detectChanges();

    const sum = page.itemRows[0].nativeElement
      .querySelector('.sum')
      .innerHTML.trim();

    expect(sum).toBe('€6.00');
  });
});
