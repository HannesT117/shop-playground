import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Address } from 'src/app/shared/interfaces';

import { createOrder } from '../../orders.actions';
import { OrderState } from '../../orders.reducer';
import { getCurrentOrder } from '../../orders.selectors';

// import { getCartSummary } from 'src/app/store/selectors';

@Component({
  selector: 'app-order-checkout',
  templateUrl: './order-checkout.component.html',
  styleUrls: ['./order-checkout.component.scss']
})
export class OrderCheckoutComponent implements OnInit {
  cartSummary$: Observable<OrderState>;

  constructor(
    private readonly store: Store<OrderState>,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.cartSummary$ = this.store.pipe(select(getCartSummary));
  }

  submit(address: Address): void {
    this.store.dispatch(createOrder(address));
    this.store
      .pipe(
        select(getCurrentOrder),
        take(1)
      )
      .subscribe(order => {
        this.router.navigate([order], {
          relativeTo: this.route
        });
      });
  }
}
