import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { reducer } from './products.reducer';
import { ProductListComponent } from './views/product-list/product-list.component';

@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('shop', reducer),
    ProductsRoutingModule
  ]
})
export class ProductsModule {}
