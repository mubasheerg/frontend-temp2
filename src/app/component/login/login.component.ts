import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { AdminService } from 'src/app/services/admin.service';
import { Admin } from 'src/app/models/admin';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  customer: Customer = new Customer();
  admin: Observable<Admin> | any;

  constructor(
    private router: Router,
    public customerService: CustomerService,
    public adminService: AdminService
  ) {}

  ngOnInit(): void {}
  onLogin(login: any) {
    if (login.username == 'admin123' && login.password == 'admin@123') {
      this.successNotification();
      this.router.navigate(['admin-dashboard']);
    } else if (login.username != 'admin123' || login.password != 'admin@123') {
      this.WrongLoginNotification();
    }
    this.customerService
      .getCustomerByMail(login.username)
      .subscribe((response) => {
        console.log(response);
        this.customer = response;
        console.log(this.customer);
        console.log(login.password);
        if (login.password == this.customer.custPwd) {
          this.successNotification();
          localStorage.setItem('userId',String(this.customer.custId));
          this.router.navigate(['customer-dashboard']);
        } else {
          this.WrongLoginNotification();
        }
      });
  }
  successNotification() {
    Swal.fire('Success', 'Login Success!', 'success');
  }
  WrongLoginNotification() {
    Swal.fire('Wrong', 'Check Username and Password', 'error');
  }
}
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
