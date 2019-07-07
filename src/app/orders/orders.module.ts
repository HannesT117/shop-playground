import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderCheckoutComponent } from './views/order-checkout/order-checkout.component';
import { OrderConfirmationComponent } from './views/order-confirmation/order-confirmation.component';

@NgModule({
  declarations: [OrderCheckoutComponent, OrderConfirmationComponent],
  imports: [CommonModule, SharedModule, OrdersRoutingModule]
})
export class OrdersModule {}
