import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-signup',
  templateUrl: './customer-signup.component.html',
  styleUrls: ['./customer-signup.component.css']
})
export class CustomerSignupComponent implements OnInit {

  signUpForm?:FormGroup;
  errorMessage?:string;
  customer?:Customer;
  custMail?:string;
  mailCustomer?:Customer;
  phoneCustomer?:Customer;

  constructor(public activatedRoute: ActivatedRoute,public customerService:CustomerService,public formBuilder: FormBuilder,public router: Router) { }

  ngOnInit(): void {

    this.customer=new Customer();

    this.signUpForm=this.formBuilder.group({
      custId:[-1],
      custName:['',[Validators.required,Validators.minLength(3)]],
      custMail:['',[Validators.required]],
      custPwd:['',[Validators.required,Validators.minLength(6)]],
      confirmPwd:['',[Validators.required]],
      custPhone:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      custAddress:['',[Validators.required]], 
    },
    {
      validator: ConfirmedValidator('custPwd', 'confirmPwd'),
    } 
    );
  }

  mailCheck(custMail: string) {
    this.customerService.getCustomerByMail(custMail).subscribe((data) => {
      this.mailCustomer = data;
      if (this.mailCustomer == null) {
        this.errorMessage = '';
      } else {
        this.errorMessage = 'MailId already exists!';
      }
    });
  }

  phoneCheck(custPhone: string) {
    this.customerService.getCustomerByPhoneNo(custPhone).subscribe((data) => {
      this.phoneCustomer = data;
      if (this.phoneCustomer == null) {
        this.errorMessage = '';
      } else {
        this.errorMessage = 'Phone number already exists';
      }
    });
  }

  customerSignUp() {
    this.customerService.addCustomer(this.signUpForm?.value).subscribe((response) => {
      this.customer = response;
      this.successNotification();
      this.router.navigate(['login']);
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
