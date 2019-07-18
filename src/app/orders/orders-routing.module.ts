import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrderCheckoutComponent } from './views/order-checkout/order-checkout.component';
import { OrderConfirmationComponent } from './views/order-confirmation/order-confirmation.component';

const routes: Routes = [
  {
    path: 'orders',
    children: [
      {
        path: 'checkout',
        component: OrderCheckoutComponent
      },
      {
        path: ':id',
        component: OrderConfirmationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {}
