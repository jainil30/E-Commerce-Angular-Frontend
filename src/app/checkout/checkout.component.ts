import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  checkoutForm: FormGroup;
  submitted = false;
  orderConfirmed = false;

  constructor(private fb: FormBuilder) {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      paymentDetails: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.checkoutForm.valid) {
      this.orderConfirmed = true;
      console.log('Order Summary', this.checkoutForm.value);
    }
  }
}
