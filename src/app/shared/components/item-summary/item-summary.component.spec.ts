import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MemoizedSelector } from '@ngrx/store';
import { List } from 'immutable';
import { ReadonlyProduct } from 'src/app/products/readonly-product';
import { Product } from 'src/app/shared/interfaces';
import { ShopState } from 'src/app/store/reducers';

import { ItemSummaryComponent } from './item-summary.component';

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

describe('ItemSummaryComponent', () => {
  let page: Page;
  let fixture: ComponentFixture<ItemSummaryComponent>;
  let component: ItemSummaryComponent;

  class Page {
    products: MemoizedSelector<ShopState, List<Product>>;

    get itemRows(): Array<DebugElement> {
      return fixture.debugElement.query(By.css('tbody')).queryAll(By.css('tr'));
    }

    get subTotal(): string | undefined {
      const tableFooter = fixture.debugElement.query(By.css('tfoot'));
      return tableFooter
        ? tableFooter.query(By.css('td')).nativeElement.innerHTML
        : undefined;
    }
  }

  function createComponent(): void {
    fixture = TestBed.createComponent(ItemSummaryComponent);
    component = fixture.componentInstance;
    page = new Page();
    fixture.detectChanges();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemSummaryComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should create', () => {
    expect(fixture.debugElement.componentInstance).toBeTruthy();
  });

  it('should display all items', () => {
    component.items = mockData;
    fixture.detectChanges();

    expect(page.itemRows.length).toBe(10);
  });

  it('should display a sum when given', () => {
    expect(page.subTotal).toBeUndefined();

    component.sum = '1234.56';
    fixture.detectChanges();

    expect(page.subTotal).toContain('1,234.56');
  });
});
