import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Address, Product } from 'src/app/shared/interfaces';
import { createOrder } from 'src/app/store/actions';
import { ShopState } from 'src/app/store/reducers';
import { getCartSummary } from 'src/app/store/selectors';

@Component({
  selector: 'app-order-checkout',
  templateUrl: './order-checkout.component.html',
  styleUrls: ['./order-checkout.component.scss']
})
export class OrderCheckoutComponent implements OnInit {
  cartSummary$: Observable<{
    items: Iterable<Product>;
    sum: number;
  }>;

  constructor(
    private readonly store: Store<ShopState>,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cartSummary$ = this.store.pipe(select(getCartSummary));
  }

  submit(address: Address): void {
    this.store.dispatch(createOrder({ address }));
    // FIXME get id back
    this.router.navigate([id], {
      relativeTo: this.route
    });
  }
}
