import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-signup',
  templateUrl: './customer-signup.component.html',
  styleUrls: ['./customer-signup.component.css'],
})
export class CustomerSignupComponent implements OnInit {
  constructor(
    public activatedRoute: ActivatedRoute,
    public customerService: CustomerService,
    public formBuilder: FormBuilder,
    public router: Router
  ) {}

  signUpForm = new FormGroup({
    name: new FormControl(''),
    custMail: new FormControl(''),
    custPwd: new FormControl(''),
    custPhone: new FormControl(''),
    custAddress: new FormControl(''),
    confirmPwd: new FormControl(''),
  });

  ngOnInit(): void {}

  customerSignUp() {
    const customer: Customer = new Customer();
    customer.custName = this.signUpForm.get('name').value;
    customer.custMail = this.signUpForm.get('custMail').value;
    customer.custPwd = this.signUpForm.get('custPwd').value;
    customer.custPhone = this.signUpForm.get('custPhone').value;
    customer.custAddress = this.signUpForm.get('custAddress').value;
    console.log(customer);
    this.customerService.addCustomer(customer).subscribe((response) => {
      console.log(response);
    });
  }

  return() {
    this.router.navigate(['login']);
  }

  successNotification() {
    Swal.fire('Success', 'Customer account created Successfully!', 'success');
  }
}

function ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
