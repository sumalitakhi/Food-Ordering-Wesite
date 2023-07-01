import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminlayoutComponent } from './adminlayout/adminlayout.component';
import { HeaderComponent } from './adminlayout/header/header.component';
import { FooterComponent } from './adminlayout/footer/footer.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserlayoutComponent } from './userlayout/userlayout.component';
import { UserheaderComponent } from './userlayout/userheader/userheader.component';
import { UserfooterComponent } from './userlayout/userfooter/userfooter.component';
import { UsermenuComponent } from './usermenu/usermenu.component';
import { UseraboutComponent } from './userabout/userabout.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { ManageCategoryComponent } from './category/manage-category/manage-category.component';
import { UpdateCategoryComponent } from './category/update-category/update-category.component';
import { UsercontactComponent } from './usercontact/usercontact.component';
import { UserregisterComponent } from './userregister/userregister.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ManageProductComponent } from './product/manage-product/manage-product.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { UserblogComponent } from './userblog/userblog.component';
import { ViewCategoryComponent } from './view-category/view-category.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { AddTableComponent } from './table/add-table/add-table.component';
import { ManageTableComponent } from './table/manage-table/manage-table.component';
import { UpdateTableComponent } from './table/update-table/update-table.component';
import { TableReservationComponent } from './table-reservation/table-reservation.component';
import { UserFeedbackComponent } from './user-feedback/user-feedback.component';
import { ViewFeedbackComponent } from './view-feedback/view-feedback.component';
import { UserviewTableComponent } from './userview-table/userview-table.component';
import { UsertableViewComponent } from './usertable-view/usertable-view.component';
import { AdmintableViewComponent } from './admintable-view/admintable-view.component';
import { ErrorComponent } from './error/error.component';
import { AddEmployeeComponent } from './Employee/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './Employee/update-employee/update-employee.component';
import { ManageEmployeeComponent } from './Employee/manage-employee/manage-employee.component';
import { EmployeeAttendanceComponent } from './employee-attendance/employee-attendance.component';
import { AttendanceTableComponent } from './attendance-table/attendance-table.component';
import { AdmincontactComponent } from './admincontact/admincontact.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { PaymentComponent } from './payment/payment.component';
import { UpdateUserprofileComponent } from './update-userprofile/update-userprofile.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { AddComponent } from './sub-category/add/add.component';
import { ManageComponent } from './sub-category/manage/manage.component';
import { UpdateComponent } from './sub-category/update/update.component';
import { AdminPasswordComponent } from './admin-password/admin-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{HttpClientModule}from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ViewProductDetailComponent } from './view-product/view-product-detail/view-product-detail.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { ManageCustomerComponent } from './customer/manage-customer/manage-customer.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminlayoutComponent,
    HeaderComponent,
    FooterComponent,
    AdminloginComponent,
    DashboardComponent,
    UserlayoutComponent,
    UserheaderComponent,
    UserfooterComponent,
    UsermenuComponent,
    UseraboutComponent,
    AddCategoryComponent,
    ManageCategoryComponent,
    UpdateCategoryComponent,
    UsercontactComponent,
    UserregisterComponent,
    UserloginComponent,
    AddProductComponent,
    ManageProductComponent,
    UpdateProductComponent,
    UserblogComponent,
    ViewCategoryComponent,
    ViewCartComponent,
    ViewProductComponent,
    AddTableComponent,
    ManageTableComponent,
    UpdateTableComponent,
    TableReservationComponent,
    UserFeedbackComponent,
    ViewFeedbackComponent,
    UserviewTableComponent,
    UsertableViewComponent,
    AdmintableViewComponent,
    ErrorComponent,
    AddEmployeeComponent,
    UpdateEmployeeComponent,
    ManageEmployeeComponent,
    EmployeeAttendanceComponent,
    AttendanceTableComponent,
    AdmincontactComponent,
    PlaceOrderComponent,
    PaymentComponent,
    UpdateUserprofileComponent,
    SubCategoryComponent,
    AddComponent,
    ManageComponent,
    UpdateComponent,
    AdminPasswordComponent,
    OrderDetailComponent,
    ViewProductDetailComponent,
    MyBookingsComponent,
    AdminOrdersComponent,
    ManageCustomerComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates:true,
    }),
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
