import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { AddressFormComponent } from './address-form.component';

describe('AddressFormComponent', () => {
  let component: AddressFormComponent;
  let fixture: ComponentFixture<AddressFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AddressFormComponent]
    });

    fixture = TestBed.createComponent(AddressFormComponent);

    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be valid when one field is empty', () => {
    component.addressForm.setValue({
      firstName: 'firstName',
      lastName: 'lastName',
      street: '',
      zipCode: 'zipCode',
      city: 'city'
    });

    expect(component.addressForm.valid).toBeFalsy();
  });

  it('should be valid when all fields are filled', () => {
    component.addressForm.setValue({
      firstName: 'firstName',
      lastName: 'lastName',
      street: 'street',
      zipCode: 'zipCode',
      city: 'city'
    });

    expect(component.addressForm.valid).toBeTruthy();
  });

  it('should submit the entered data', done => {
    const homeOfSherlock = {
      firstName: 'John',
      lastName: 'Doe',
      street: '221 Baker Street',
      zipCode: 'NW1 6XE',
      city: 'London'
    };
    component.addressForm.setValue(homeOfSherlock);

    component.submitAddress.subscribe(address => {
      expect(address).toEqual(homeOfSherlock);
      done();
    });

    component.onSubmit();
  });
});
