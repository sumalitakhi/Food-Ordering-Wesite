import { Component, OnInit, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/shared/category/category.service';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit {

  IMGURL:any
  categories:any[] = []
  constructor(private category:CategoryService,@Inject('imageurl') _imageurl:any, private sanitizer:DomSanitizer,private Toastr:ToastrService){
    this.IMGURL = _imageurl
  }

  ngOnInit(): void {

    this.getAllCategories()
  }


  getImgSrc(imgPath:any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.IMGURL+imgPath)
  }
  getAllCategories(){
    this.category.getAllCategory({status:'true'}).subscribe((res:any)=>{
      if(res.success){
        this.categories = res.data

      }
      else{

      }
    })
  }

  delete(id:any){
  this.category.deleteCategory({_id:id,status:"false"}).subscribe((res:any)=>{
    if(res.success){
      this.Toastr.success(res.message,"successfull")
      this.getAllCategories()
    }
    else{
      this.Toastr.error(res.message)
    }
  })

  }
}
