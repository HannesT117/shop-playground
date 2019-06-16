import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrderCheckoutComponent } from './views/order-checkout/order-checkout.component';
import { OrderConfirmationComponent } from './views/order-confirmation/order-confirmation.component';

const routes: Routes = [
  {
    path: 'checkout',
    component: OrderCheckoutComponent
  },
  {
    path: 'confirmation',
    component: OrderConfirmationComponent
  },
  {
    path: '',
    component: OrderCheckoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {}
