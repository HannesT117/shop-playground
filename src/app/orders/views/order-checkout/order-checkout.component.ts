import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Address, Product } from 'src/app/shared/interfaces';
import { createOrder } from 'src/app/store/actions';
import { ShopState } from 'src/app/store/reducers';
import { getCartSummary } from 'src/app/store/selectors';
import { v4 as uuid } from 'uuid';

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
    const id = uuid();
    this.store.dispatch(createOrder({ address, id }));
    this.router.navigate([id], {
      relativeTo: this.route
    });
  }
}
