import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminlayoutComponent } from './adminlayout/adminlayout.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { UserlayoutComponent } from './userlayout/userlayout.component';
import { UsermenuComponent } from './usermenu/usermenu.component';
import { UseraboutComponent } from './userabout/userabout.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { UpdateCategoryComponent } from './category/update-category/update-category.component';
import { ManageCategoryComponent } from './category/manage-category/manage-category.component';
import { UserregisterComponent } from './userregister/userregister.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { UsercontactComponent } from './usercontact/usercontact.component';
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
import { AddEmployeeComponent } from './Employee/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './Employee/update-employee/update-employee.component';
import { ManageEmployeeComponent } from './Employee/manage-employee/manage-employee.component';
import { ErrorComponent } from './error/error.component';
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
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { AuthGuard } from './auth_guard/auth.guard';
import { ViewProductDetailComponent } from './view-product/view-product-detail/view-product-detail.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { UserAuthGuard } from './userAuthGuard/user-auth.guard';
import { ManageCustomerComponent } from './customer/manage-customer/manage-customer.component';


const routes: Routes = [
  {
    path: "", redirectTo: "/userlayout/home", pathMatch: "full"
  },
  {
    path: "adminlogin", component: AdminloginComponent
  },
  {
    path: "payment/:value", component: PaymentComponent
  },
  {
    path: "admin-password", component: AdminPasswordComponent
  },
  {
    path: "adminlayout", component: AdminlayoutComponent,
    children: [

      {
        path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard]
      },
      {
        path: "category/add-category", component: AddCategoryComponent, canActivate: [AuthGuard]
      },
      {
        path: "category/update-category/:_id", component: UpdateCategoryComponent, canActivate: [AuthGuard]
      },
      {
        path: "category/manage-category", component: ManageCategoryComponent, canActivate: [AuthGuard]
      },
      {
        path: 'sub-category/add', component: AddComponent, canActivate: [AuthGuard]
      },
      {
        path: 'sub-category/manage', component: ManageComponent, canActivate: [AuthGuard]
      },
      {
        path: 'sub-category/update/:_id', component: UpdateComponent, canActivate: [AuthGuard]
      },
      {
        path: "product/add-product", component: AddProductComponent, canActivate: [AuthGuard]
      },
      {
        path: "product/manage-product", component: ManageProductComponent, canActivate: [AuthGuard]
      },
      {
        path: "product/update-product/:_id", component: UpdateProductComponent, canActivate: [AuthGuard]
      },
      {
        path: "orders/view", component: AdminOrdersComponent, canActivate: [AuthGuard]
      },
      {
        path: "table/add-table", component: AddTableComponent, canActivate: [AuthGuard]
      },
      {
        path: "table/manage-table", component: ManageTableComponent, canActivate: [AuthGuard]
      },
      {
        path: "table/update-table/:_id", component: UpdateTableComponent, canActivate: [AuthGuard]
      },
      {
        path: "view-feedback", component: ViewFeedbackComponent, canActivate: [AuthGuard]
      },
      {
        path: "admintable-view", component: AdmintableViewComponent, canActivate: [AuthGuard]
      },
      {
        path: "Employee/add-employee", component: AddEmployeeComponent, canActivate: [AuthGuard]
      },
      {
        path: "Employee/manage-employee", component: ManageEmployeeComponent, canActivate: [AuthGuard]
      },
      {
        path: "Employee/update-employee/:_id", component: UpdateEmployeeComponent, canActivate: [AuthGuard]
      },
      {
        path: "employee-attendance", component: EmployeeAttendanceComponent, canActivate: [AuthGuard]
      },
      {
        path: "attendance-table", component: AttendanceTableComponent, canActivate: [AuthGuard]
      },
      {
        path: "admincontact", component: AdmincontactComponent, canActivate: [AuthGuard]
      },
      {
        path:'customer/manage-customer',component:ManageCustomerComponent, canActivate: [AuthGuard]
      }
    

    ]
  },
  {
    path: "userlogin", component: UserloginComponent
  },
  {
    path: "userregister", component: UserregisterComponent
  },
  {
    path: "update-userprofile", component: UpdateUserprofileComponent, canActivate: [UserAuthGuard ]
  },
  {
    path: "userlayout", component: UserlayoutComponent,
    children: [
      {
        path: "home", component: HomeComponent
      },
      {
        path: "userabout", component: UseraboutComponent
      },
      {
        path: "usermenu", component: UsermenuComponent
      },
      {
        path: "usercontact", component: UsercontactComponent
      },
      {
        path: "userblog", component: UserblogComponent
      },
      {
        path: "view-category", component: ViewCategoryComponent
      },
      {
        path: "view-cart", component: ViewCartComponent, canActivate: [UserAuthGuard ]
      },
      
      {
        path: "view-product/:_id", component: ViewProductComponent
      },
      {
        path: "view-product-detail/:_id", component: ViewProductDetailComponent
      },
      {
        path: "table-reservation/:_id", component: TableReservationComponent, canActivate: [UserAuthGuard ]
      },
      {
        path: "user-feedback", component: UserFeedbackComponent, canActivate: [UserAuthGuard ]
      },
      {
        path: "userview-table", component: UserviewTableComponent
      },
      {
        path: "usertable-view", component: UsertableViewComponent, canActivate: [UserAuthGuard ]
      },
      {
        path: "place-order", component: PlaceOrderComponent, canActivate: [UserAuthGuard ]
      },
     
      {
        path: "sub-category/:_id", component: SubCategoryComponent
      },
      {
        path: "order-detail/:_id", component: OrderDetailComponent, canActivate: [UserAuthGuard ]
      },
      {
        path: "my-bookings", component: MyBookingsComponent, canActivate: [UserAuthGuard ]
      }
    ]




  },
  {
    path: "**", component: ErrorComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
