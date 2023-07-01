import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { CartService } from 'src/app/shared/cart/cart.service';
import { ProductService } from 'src/app/shared/product/product.service';

@Component({
  selector: 'app-view-product-detail',
  templateUrl: './view-product-detail.component.html',
  styleUrls: ['./view-product-detail.component.css'],
})
export class ViewProductDetailComponent {
  qtyArr:number[]=[1,2,3,4,5,6,7,8,9,10]
  IMGURL:any
  prodData: any = {};
  cartForm = new FormGroup({
    userId: new FormControl('', [Validators.required]),
    quantity: new FormControl('1', [Validators.required]),
    productId: new FormControl('', [Validators.required]),
  });

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private product: ProductService,
    private activatedRoute: ActivatedRoute,
    private cart:CartService, private auth:AuthService,
    private sanitizer:DomSanitizer,
    @Inject('imageurl') _imageurl:any
  ) {
    this.IMGURL = _imageurl
  }
  ngOnInit(): void {
    this.getProduct(this.activatedRoute.snapshot.paramMap.get('_id'));
  }

  getProduct(id: any) {
    this.product.getSingle({ _id: id }).subscribe((res: any) => {
      if (res.success) {
        this.prodData = res.data;
      } else {
      }
    });
  }

  getImgSrc(imgPath:any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.IMGURL+imgPath)
  }

  addToCart(){

    if(this.auth.getId()!=null){
        this.cartForm.patchValue({userId:this.auth.getId()})
        this.cartForm.patchValue({productId:this.activatedRoute.snapshot.paramMap.get('_id')})
        console.log(this.cartForm.value);

        if(this.cartForm.valid){
          this.cart.addcartItem(this.cartForm.value).subscribe((res:any)=>{
            if(res.success){
              this.toastr.success(res.message,"Success")
              this.router.navigateByUrl('/userlayout/view-cart')
            }
            else{
              this.toastr.error(res.message)
            }
          })
        }
        else this.toastr.error("Choose quantity")
    }
    else  this.router.navigateByUrl('/userlogin')

  }


}
