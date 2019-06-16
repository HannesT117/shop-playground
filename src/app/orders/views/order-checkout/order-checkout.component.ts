import { Component } from '@angular/core';
import { Address } from 'src/app/shared/interfaces/address';

@Component({
  selector: 'app-order-checkout',
  templateUrl: './order-checkout.component.html',
  styleUrls: ['./order-checkout.component.scss']
})
export class OrderCheckoutComponent {
  model: Address = {
    firstName: '',
    surname: '',
    street: '',
    postalCode: ''
  };

  onSubmit() {
    // TODO
  }
}
