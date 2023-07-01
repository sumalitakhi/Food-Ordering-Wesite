import { Component, Inject } from '@angular/core';
import { OrderService } from '../shared/order/order.service';
import { AuthService } from '../shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent {

  IMGURL:any
  constructor(private order:OrderService, private activatedRoute:ActivatedRoute, private toastr:ToastrService,@Inject('imageurl') _imageurl:any, private sanitizer:DomSanitizer){
    this.IMGURL = _imageurl
  }
  orderdetails:any[] = []
  ngOnInit(): void {
    this.getOrderDetail()
  }

  getImgSrc(imgPath:any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.IMGURL+imgPath)
  }

  getOrderDetail(){
    this.order.getOrderDetail({orderId:this.activatedRoute.snapshot.paramMap.get('_id')}).subscribe((res:any)=>{
      if(res.success)
      {
        this.orderdetails = res.data
        // this.toastr.success(res.message)
      }
      else this.toastr.error(res.message)
    })
  }
}
