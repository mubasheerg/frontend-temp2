import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './component/admin/admin-dashboard/admin-dashboard.component';
import { CustomerSignupComponent } from './component/customer/customer-signup/customer-signup.component';
import { LoginComponent } from './component/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddProductComponent } from './component/products/add-products/add-product.component';
import { ViewAllProductComponent } from './component/products/view-all-product/view-all-product.component';
import { EditProductComponent } from './component/products/edit-products/edit-product.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CustomerSignupComponent,
    AdminDashboardComponent,
    AddProductComponent,
    EditProductComponent,
    ViewAllProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
