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
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  customer:Observable<Customer>|any;
  admin:Observable<Admin>|any;

  constructor(private router:Router,public customerService:CustomerService,public adminService:AdminService) { }

  ngOnInit(): void {}
  
  async onLogin(credential:any){
    this.adminService.getAdminById(credential.username).subscribe((data) => {
      this.admin = data;
      this.admin = this.admin.data;
      console.log(this.admin.adminPwd);
    });
    this.customerService.getCustomerByMail(credential.username).subscribe((data)=>{
       this.customer=data;
       this.customer=this.customer.data;
       console.log(this.customer.custPwd);
     });   
     this.check(credential);
   }

    async check(credential:any){
      if (credential.username == 'admin123' && credential.password == 'admin@123') {
        this.successNotification();
        this.router.navigate(['adminDashboard']);
      }
      else if (this.customer != null && this.customer.password == credential.password) {
       this.successNotification();
       localStorage.setItem('customerMail', credential.username);
       this.router.navigate(['customerDashboard']);
      }
      else if (this.admin != null && this.admin.adminPwd == credential.password){
       this.successNotification();
       localStorage.setItem('adminId', credential.username);
       this.router.navigate(['']);
      }
      else {
       this.WrongLoginNotification();
       window.location.reload();
      }
    }
    
    successNotification() {
      Swal.fire('Success', 'Login Success!', 'success');
    }
    WrongLoginNotification() {
      Swal.fire('Wrong', 'Check Username and Password', 'error');
    }

}


