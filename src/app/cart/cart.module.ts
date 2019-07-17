import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';
import * as fromCart from './cart.reducer';
import { CartDetailComponent } from './views/cart-detail/cart-detail.component';

@NgModule({
  declarations: [CartDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('orders', fromCart),
    CartRoutingModule
  ]
})
export class CartModule {}
