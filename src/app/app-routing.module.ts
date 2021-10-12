import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './component/admin/admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './component/customer/customer-dashboard/customer-dashboard.component';
import { CustomerSignupComponent } from './component/customer/customer-signup/customer-signup.component';
import { LoginComponent } from './component/login/login.component';
import { ViewAllOrderComponent } from './component/order/view-all-order/view-all-order.component';
import { AddProductComponent } from './component/products/add-products/add-product.component';
import { EditProductComponent } from './component/products/edit-products/edit-product.component';
import { ViewAllProductComponent } from './component/products/view-all-product/view-all-product.component';

const routes: Routes = [

  {path:'customer-signUp',component:CustomerSignupComponent},
  {path:'login',component:LoginComponent},
  {path:'admin-dashboard',component:AdminDashboardComponent},
  {path:'add-products',component:AddProductComponent},
  {path:'edit-products/:prodId',component:EditProductComponent},
  {path:'view-all-products',component:ViewAllProductComponent},
  {path:'view-all-orders',component:ViewAllOrderComponent}, 
  {path:'customer-dashboard',component:CustomerDashboardComponent},
  {path:'**',component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
