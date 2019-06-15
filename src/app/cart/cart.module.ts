import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { CartRoutingModule } from './cart-routing.module';
import { reducer } from './store/cart.reducers';
import { CartDetailComponent } from './views/cart-detail/cart-detail.component';

@NgModule({
  declarations: [CartDetailComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('cart', reducer),
    CartRoutingModule
  ]
})
export class CartModule {}
