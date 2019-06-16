import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-order-checkout',
  templateUrl: './order-checkout.component.html',
  styleUrls: ['./order-checkout.component.scss']
})
export class OrderCheckoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  addAddress(address: Address): void {}
}
