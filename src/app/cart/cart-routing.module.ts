import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartDetailComponent } from './views/cart-detail/cart-detail.component';

const routes: Routes = [
  {
    path: 'cart',
    component: CartDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule {}
