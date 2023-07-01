import { Component, Inject, OnInit } from '@angular/core';
import { CategoryService } from '../shared/category/category.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})

export class ViewCategoryComponent implements OnInit {

  IMGURL:any
  categories:any[] = []
  constructor(private category:CategoryService,@Inject('imageurl') _imageurl:any, private sanitizer:DomSanitizer){
    this.IMGURL = _imageurl
  }

  ngOnInit(): void {
    this.getAllCategories()
  }


  getImgSrc(imgPath:any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.IMGURL+imgPath)
  }
  getAllCategories(){
    this.category.getAllCategory({status:true}).subscribe((res:any)=>{
      if(res.success){
        this.categories = res.data
      }
      else{

      }
    })
  }
}
