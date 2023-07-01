import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { CategoryService } from 'src/app/shared/category/category.service';
import { SubCategoryService } from 'src/app/shared/sub-category/sub-category.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  categories:any[] = []
 addSubCategory=new FormGroup({
  subCategoryName: new FormControl("",[Validators.required]),
  categoryId: new FormControl("",[Validators.required]),
  image:new FormControl("",[Validators.required])
 })
 
 constructor(private toastr:ToastrService, private subCategory:SubCategoryService,private router:Router,private auth:AuthService,private category:CategoryService){

 }
ngOnInit(): void {
    this.getAllCategories()
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
  uploadimage(event:any){
    this.addSubCategory.patchValue({'image':event.target.files[0]})
   }
   submit(){
    var data=new FormData
    data.append('subCategoryName',this.addSubCategory.value.subCategoryName??"")
    data.append('image',this.addSubCategory.value.image??"")
    data.append('categoryId',this.addSubCategory.value.categoryId??"")
    this.subCategory.addapi(data).subscribe((res:any)=>{
      if(res.success){
        this.toastr.success(res.message,"successfull")
        this.router.navigateByUrl('/adminlayout/sub-category/manage')
      }
      else{
        this.toastr.error(res.message)
      }

    })
  }
   }



