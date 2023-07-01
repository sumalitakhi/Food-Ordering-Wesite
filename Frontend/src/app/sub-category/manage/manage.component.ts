import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { SubCategoryService } from 'src/app/shared/sub-category/sub-category.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})

export class ManageComponent implements OnInit {

  IMGURL:any
  categories:any[] = []
  constructor(private subCategory:SubCategoryService,@Inject('imageurl') _imageurl:any, private sanitizer:DomSanitizer,private toastr:ToastrService){
    this.IMGURL = _imageurl
  }

  ngOnInit(): void {
    this.getAllSubCategories()
  }


  getImgSrc(imgPath:any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.IMGURL+imgPath)
  }
  getAllSubCategories(){
    this.subCategory.getAllSubCategory({status:'true'}).subscribe((res:any)=>{
      if(res.success){
        this.categories = res.data
      }
      else{

      }
    })
  }
  delete(id:any){
    this.subCategory.deleteSubCategory({_id:id,status:'false'}).subscribe((res:any)=>{
      if(res.success){
        this.toastr.success(res.message,"delete successfully")
        this.getAllSubCategories()
      }
      else{
        this.toastr.error(res.message)
      }
    })

  }
}
