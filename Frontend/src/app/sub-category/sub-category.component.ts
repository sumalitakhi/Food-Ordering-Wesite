import { Component, Inject, OnInit } from '@angular/core';
import { SubCategoryService } from '../shared/sub-category/sub-category.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})


export class SubCategoryComponent implements OnInit {

  IMGURL:any
  categories:any[] = []
  constructor(private subCategory:SubCategoryService,@Inject('imageurl') _imageurl:any, private sanitizer:DomSanitizer, private activatedRoute:ActivatedRoute){
    this.IMGURL = _imageurl
  }

  ngOnInit(): void {

    this.getAllSubCategories(this.activatedRoute.snapshot.paramMap.get('_id'))
  }


  getImgSrc(imgPath:any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.IMGURL+imgPath)
  }
  getAllSubCategories(id:any){
    this.subCategory.getAllSubCategory({status:'true', categoryId:id}).subscribe((res:any)=>{
      if(res.success){
        this.categories = res.data
      }
      else{

      }
    })
  }

}
