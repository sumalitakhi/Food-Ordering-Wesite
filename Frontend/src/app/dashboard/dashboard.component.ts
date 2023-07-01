import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit  {
  category:number=0
  product:number=0
  subcategory:number=0
  customer:number=0
  employee:number=0
  order:number=0
  booking:number=0
  table:number=0
  constructor(private authservice:AuthService,private toastr:ToastrService,private router:Router, private user:UserService){}

  ngOnInit(): void {
    this.getDashboard()
  }
   

  getDashboard(){
    this.user.dashboard().subscribe((res:any)=>{
      if(res.success)
      {
        this.customer = res.totalCustomer
        this.category = res.totalCategories
        this.subcategory = res.totalSubCategories
        this.product = res.totalproducts
        this.booking=res.bookingTable
        this.table=res.totalTable
        this.employee=res.employees
        this.order=res.orders
      } 
    })
  }
}
