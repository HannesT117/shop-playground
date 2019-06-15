import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product';

import { CartState } from '../../store/cart.reducers';
import { getItems } from '../../store/cart.selectors';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartDetailComponent implements OnInit {
  items$: Observable<Map<Product, number>>;

  constructor(private readonly store: Store<CartState>) {}

  ngOnInit() {
    this.items$ = this.store.pipe(select(getItems));
  }

  changeAmount(item: Product, amount: number): void {
    console.log(item, amount);
  }
}
