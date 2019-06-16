import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product';
import { addToCart, removeFromCart } from 'src/app/store/actions';
import { getItemsInCart } from 'src/app/store/selectors';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartDetailComponent implements OnInit {
  items$: Observable<Iterable<Product>>;

  constructor(
    private readonly store: Store<Iterable<Product>>,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.items$ = this.store.pipe(select(getItemsInCart));
  }

  changeAmount(product: Product, amount: number): void {
    const difference = amount - product.amountInCart;
    const action =
      difference > 0
        ? addToCart({ product, amount: difference })
        : removeFromCart({ product, amount: -difference });

    this.store.dispatch(action);
  }

  goToCheckout(): void {
    this.router.navigate(['/orders']);
  }

  notEmpty = (items: Iterable<any>) =>
    items && !items[Symbol.iterator]().next().done
}
