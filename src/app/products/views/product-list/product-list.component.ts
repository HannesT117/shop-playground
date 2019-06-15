import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { addToCart } from 'src/app/store/actions';

import { Product } from '../../../shared/interfaces/product';
import * as fromProducts from '../../../store/selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  products$: Observable<Iterable<Product>>;

  constructor(private store: Store<Iterable<Product>>) {}

  ngOnInit() {
    this.products$ = this.store.pipe(
      select(fromProducts.getProducts),
      tap(data => console.error(data))
    );
  }

  select(product: Product) {
    this.store.dispatch(addToCart({ product }));
  }
}
