import { Component, Inject } from '@angular/core';
import { ProductService } from '../shared/product/product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../shared/cart/cart.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent {
  IMGURL:any
  products:any[] = []
  constructor(private product:ProductService,private cart:CartService,@Inject('imageurl') _imageurl:any, private sanitizer:DomSanitizer,private toastr:ToastrService, private activatedRoute:ActivatedRoute){
    this.IMGURL = _imageurl
  }

  ngOnInit(): void {
    this.getAllProducts()
  }


  getImgSrc(imgPath:any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.IMGURL+imgPath)
  }
  getAllProducts(){
    this.product.getAllProduct({status:true, subCategoryId:this.activatedRoute.snapshot.paramMap.get('_id')}).subscribe((res:any)=>{
      if(res.success){
        this.products = res.data
      }
      else{

      }
    })
  }
}

