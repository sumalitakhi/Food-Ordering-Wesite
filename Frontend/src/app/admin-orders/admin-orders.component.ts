import { Component } from '@angular/core';
import { OrderService } from '../shared/order/order.service';
import { AuthService } from '../shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  constructor(private order:OrderService, private auth:AuthService, private toastr:ToastrService){}
  orders:any[] = []
  ngOnInit(): void {
    this.getAllOrders()
  }

  getAllOrders(){
    this.order.getAllOrder({}).subscribe((res:any)=>{
      if(res.success)
      {
        this.orders = res.data
        // this.toastr.success(res.message)
      }
      else this.toastr.error(res.message)
    })
  }

  checkStatus(id:any, status:any){
    this.order.cancelOrder({_id:id, status:status}).subscribe((res:any)=>{
      if(res.success)
      {
        this.getAllOrders()
        // this.toastr.success(res.message)
      }
      else this.toastr.error(res.message)
    })
  }
}
