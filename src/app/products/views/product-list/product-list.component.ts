import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../../../shared/interfaces/product';
import { Observable } from 'rxjs';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  products$: Observable<Iterable<Product>>;

  constructor(private readonly service: ProductsService) {}

  ngOnInit() {
    this.products$ = this.service.fetchProducts();
  }

  select(product: Product) {
    this.service.select(product);
  }
}
