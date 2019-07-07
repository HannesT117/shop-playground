import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AddressFormComponent } from './components/address-form/address-form.component';
import { ItemSummaryComponent } from './components/item-summary/item-summary.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [AddressFormComponent, NavbarComponent, ItemSummaryComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [AddressFormComponent, NavbarComponent, ItemSummaryComponent]
})
export class SharedModule {}
