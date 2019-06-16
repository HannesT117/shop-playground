import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/shared/interfaces/address';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressFormComponent {
  @Output() submitAddress = new EventEmitter<Address>();

  addressForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    zipCode: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required)
  });

  onSubmit(): void {
    this.submitAddress.emit(this.addressForm.value);
  }
}
