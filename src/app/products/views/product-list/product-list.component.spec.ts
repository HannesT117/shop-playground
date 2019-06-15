import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ProductsService } from '../../products.service';
import { Product } from '../../../shared/interfaces/product';
import { List } from 'immutable';
import { of } from 'rxjs';
import { click } from 'src/testing';
import { ReadonlyProduct } from '../../readonly-product';

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
    fetchProductsSpy: jest.SpyInstance;
    selectSpy: jest.SpyInstance;

    get products(): Array<DebugElement> {
      return fixture.debugElement.queryAll(By.css('.product'));
    }

    click(product: DebugElement) {
      const button = product.nativeElement.querySelector('button');
      click(button);
    }

    constructor(fix: ComponentFixture<ProductListComponent>) {
      const productsService = fix.debugElement.injector.get(
        ProductsService
      ) as jest.Mocked<ProductsService>;

      this.fetchProductsSpy = productsService.fetchProducts;
      this.selectSpy = productsService.select;
    }
  }

  function createComponent(): void {
    fixture = TestBed.createComponent(ProductListComponent);
    page = new Page(fixture);

    page.fetchProductsSpy.mockReturnValue(of(mockData));
    fixture.detectChanges();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            fetchProducts: jest.fn(),
            select: jest.fn()
          }
        }
      ]
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
    page.click(page.products[1]);
    fixture.detectChanges();

    expect(page.selectSpy).toHaveBeenCalledWith(mockData.get(1));
  });
});
