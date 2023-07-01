import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order/order.service';
import { AuthService } from '../shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {


  constructor(private order:OrderService, private auth:AuthService, private toastr:ToastrService){}
  orders:any[] = []
  ngOnInit(): void {
    this.getAllOrders()
  }

  getAllOrders(){
    this.order.getAllOrder({userId:this.auth.getId()}).subscribe((res:any)=>{
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
