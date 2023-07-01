import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OrderService } from '../shared/order/order.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  orderForm = new FormGroup({
    amount:new FormControl(''),
    userId:new FormControl(''),
    name:new FormControl(''),
    contact:new FormControl(''),
    paymentType:new FormControl(''),
    cardName:new FormControl(''),
    cardNumber:new FormControl(''),
    cvv:new FormControl(''),
    expDate:new FormControl(''),
    address:new FormControl(''),
    prodList:new FormControl('')
  })

  constructor( private _router:Router,private auth:AuthService,private activatedRoute:ActivatedRoute, private toastr:ToastrService,private order:OrderService){} 

  addOrder(){
    this.orderForm.patchValue({userId:this.auth.getId()})
    this.orderForm.patchValue({amount:this.activatedRoute.snapshot.paramMap.get('value')})
    this.orderForm.patchValue({prodList:sessionStorage.getItem('prodList')})
    this.order.addOrder(this.orderForm.value).subscribe((res:any)=>{
      if(res.success){
        this._router.navigateByUrl('/userlayout/place-order')
        this.toastr.success(res.message)
        sessionStorage.removeItem('prodList')
      }
      else this.toastr.error(res.message)
    })
  }
}