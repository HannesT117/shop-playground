import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AddressFormComponent } from './components/address-form/address-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [AddressFormComponent, NavbarComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [AddressFormComponent, NavbarComponent]
})
export class SharedModule {}
