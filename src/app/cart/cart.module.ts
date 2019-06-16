import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';
import { CartDetailComponent } from './views/cart-detail/cart-detail.component';

@NgModule({
  declarations: [CartDetailComponent],
  imports: [CommonModule, SharedModule, CartRoutingModule]
})
export class CartModule {}
