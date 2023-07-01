import { Component, Inject, OnInit } from '@angular/core';
import { CartService } from '../shared/cart/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { OrderService } from '../shared/order/order.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {

  IMGURL:any
  qty:number = 0
  cartItems:any[] = []
  qtyArr:number[]=[1,2,3,4,5,6,7,8,9,10]
  total:number = 0
  
  constructor(private cart:CartService, private _router:Router, private auth:AuthService, private toastr:ToastrService, @Inject('imageurl') _imageurl:any, private sanitizer:DomSanitizer, private order:OrderService){
    this.IMGURL = _imageurl
  }

  ngOnInit(): void {
    this.getCart()
  }

  updateQuantity(id:any, qty:any){
    this.cart.updatecartItem({_id:id, quantity:qty}).subscribe((res:any)=>{
      if(res.success){
        this.getCart()
      }
      else this.toastr.error(res.message)
    })

  }

  getCart(){
    this.total = 0
    this.cart.getAllcartItem({userId:this.auth.getId()}).subscribe((res:any)=>{
      if(res.success){
        this.cartItems = res.data
        this.cartItems.forEach((element:any)=>{
          this.total += element.productId.price * element.quantity 
        })
      }
      else this.toastr.error(res.message)
    })
  }

  getImgSrc(imgPath:any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.IMGURL+imgPath)
  }

  delete(id:any)
  {
    this.cart.deletecartItem({_id:id}).subscribe((res:any)=>{
      if(res.success){
        this.getCart()
      }
      else this.toastr.error(res.message)
    })
  }

  saveProdList(){
    let arr:any = []
    for (let index = 0; index < this.cartItems.length; index++) {
      const element = this.cartItems[index];

      let obj = {
        cartId:element._id,
        productId:element.productId._id,
        quantity:element.quantity,
        price:element.productId.price
      }
      arr.push(obj)
      console.log(arr);
      
    }
    sessionStorage.setItem("prodList", JSON.stringify(arr))
  }
  
}
