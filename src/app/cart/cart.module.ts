import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';
import { reducer } from './cart.reducer';
import { CartDetailComponent } from './views/cart-detail/cart-detail.component';

@NgModule({
  declarations: [CartDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('cart', reducer),
    CartRoutingModule
  ]
})
export class CartModule {}
