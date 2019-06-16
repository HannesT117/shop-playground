import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderCheckoutComponent } from './views/order-checkout/order-checkout.component';

@NgModule({
  declarations: [OrderCheckoutComponent],
  imports: [CommonModule, FormsModule, OrdersRoutingModule]
})
export class OrdersModule {}
