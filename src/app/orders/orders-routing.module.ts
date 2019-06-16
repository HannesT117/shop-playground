import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrderCheckoutComponent } from './views/order-checkout/order-checkout.component';

const routes: Routes = [
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
