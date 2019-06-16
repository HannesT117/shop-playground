import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AddressFormComponent } from './components/address-form/address-form.component';
import { ProductComponent } from './components/product/product.component';

@NgModule({
  declarations: [AddressFormComponent, ProductComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [AddressFormComponent, ProductComponent]
})
export class SharedModule {}
