import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {
  orderId$: Observable<string | null>;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit() {
    this.orderId$ = this.route.paramMap.pipe(map(params => params.get('id')));
  }
}
