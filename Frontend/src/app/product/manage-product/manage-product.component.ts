import { Component, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/shared/product/product.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent {
  IMGURL:any
  products:any[] = []
  constructor(private product:ProductService,@Inject('imageurl') _imageurl:any, private sanitizer:DomSanitizer,private toastr:ToastrService){
    this.IMGURL = _imageurl
  }

  ngOnInit(): void {
    this.getAllProducts()
  }


  getImgSrc(imgPath:any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.IMGURL+imgPath)
  }
  getAllProducts(){
    this.product.getAllProduct({status:true}).subscribe((res:any)=>{
      if(res.success){
        this.products = res.data
      }
      else{

      }
    })
  }
  delete(id:any){
    this.product.deleteProduct({_id:id,status:'false'}).subscribe((res:any)=>{
      if(res.success){
        this.getAllProducts()
        this.toastr.success(res.message,"delete successfully")
      }
      else{
        this.toastr.error(res.message)
      }
    })

  }
}
