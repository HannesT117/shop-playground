import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/interfaces';
import { getItemsInCart, getSumOfCart } from 'src/app/store/selectors';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  items$: Observable<Iterable<Product>>;
  sum$: Observable<number>;

  constructor(private readonly store: Store<Iterable<Product>>) {}

  ngOnInit() {
    this.items$ = this.store.pipe(select(getItemsInCart));
    this.sum$ = this.store.pipe(select(getSumOfCart));
  }
}
