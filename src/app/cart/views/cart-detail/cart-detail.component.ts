import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product';
import { addToCart, removeFromCart } from 'src/app/store/actions';
import { getItemsInCart, getSumOfCart } from 'src/app/store/selectors';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit {
  items$: Observable<Iterable<Product>>;
  sum$: Observable<number>;

  constructor(
    private readonly store: Store<Iterable<Product>>,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.items$ = this.store.pipe(select(getItemsInCart));
    this.sum$ = this.store.pipe(select(getSumOfCart));
  }

  changeAmount({ item, amount }: { item: Product; amount: number }): void {
    const difference = amount - item.amountInCart;
    const action =
      difference > 0
        ? addToCart({ product: item, amount: difference })
        : removeFromCart({ product: item, amount: -difference });

    this.store.dispatch(action);
  }

  goToCheckout(): void {
    this.router.navigate(['/orders']);
  }

  notEmpty = (items: Iterable<any>) =>
    items && !items[Symbol.iterator]().next().done
}
