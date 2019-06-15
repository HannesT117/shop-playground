import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CartRoutingModule } from './cart-routing.module';
import { CartDetailComponent } from './views/cart-detail/cart-detail.component';

@NgModule({
  declarations: [CartDetailComponent],
  imports: [CommonModule, CartRoutingModule]
})
export class CartModule {}
