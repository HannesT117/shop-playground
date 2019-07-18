import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SharedActions } from 'src/app/shared/state/actions';

import { Product } from '../../../shared/interfaces/product';
import { ShopState } from '../../products.reducer';
import * as fromProducts from '../../products.selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  products$: Observable<Array<Product>>;

  constructor(private store: Store<ShopState>) {}

  ngOnInit() {
    this.products$ = this.store.pipe(select(fromProducts.getAllItems));
  }

  select(product: Product) {
    this.store.dispatch(SharedActions.selectItem({ product }));
  }
}
