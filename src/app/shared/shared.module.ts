import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AddressFormComponent } from './components/address-form/address-form.component';

@NgModule({
  declarations: [AddressFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [AddressFormComponent]
})
export class SharedModule {}
