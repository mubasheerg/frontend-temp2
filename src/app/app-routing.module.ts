import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './component/admin/admin-dashboard/admin-dashboard.component';
import { CustomerSignupComponent } from './component/customer/customer-signup/customer-signup.component';
import { LoginComponent } from './component/login/login.component';
import { AddProductComponent } from './component/products/add-products/add-product.component';
import { EditProductComponent } from './component/products/edit-products/edit-product.component';
import { ViewAllProductComponent } from './component/products/view-all-product/view-all-product.component';

const routes: Routes = [

  {path:'customerSignUp',component:CustomerSignupComponent},
  {path:'login',component:LoginComponent},
  {path:'adminDashboard',component:AdminDashboardComponent},
  {path:'add-products',component:AddProductComponent},
  {path:'edit-products/:prodId',component:EditProductComponent},
  {path:'view-all-products',component:ViewAllProductComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
