import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { ProductsRoutingModule } from './products-routing.module';
import { reducer } from './store/products.reducers';
import { ProductListComponent } from './views/product-list/product-list.component';

@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('products', reducer),
    ProductsRoutingModule
  ]
})
export class ProductsModule {}
