import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { CategoryService } from 'src/app/shared/category/category.service';
import { SubCategoryService } from 'src/app/shared/sub-category/sub-category.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  categories:any[] = []
  updateSubCategory=new FormGroup({
    _id:new FormControl("",[Validators.required]),
   subCategoryName: new FormControl("",[Validators.required]),
   categoryId: new FormControl("",[Validators.required]),
   image:new FormControl("",[Validators.required])
  })

  constructor(private toastr:ToastrService, private subCategory:SubCategoryService,private router:Router,private auth:AuthService,private category:CategoryService, private activatedRoute:ActivatedRoute){

  }
 ngOnInit(): void {
      this.updateSubCategory.patchValue({_id:this.activatedRoute.snapshot.paramMap.get('_id')})
      console.log(this.updateSubCategory.value._id);

     this.getAllCategories()
     this.getSubcategory(this.activatedRoute.snapshot.paramMap.get('_id'))
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

   getSubcategory(id:any){
      this.subCategory.getSingleSubCategory({_id:id}).subscribe((res:any)=>{
        if(res.success){
          this.updateSubCategory.patchValue({categoryId:res.data.categoryId._id})
          this.updateSubCategory.patchValue({subCategoryName:res.data.subCategoryName})
        }
        else{

        }
      })
   }
   uploadimage(event:any){
     this.updateSubCategory.patchValue({'image':event.target.files[0]})
    }
    submit(){
     var data=new FormData
     data.append('_id',this.updateSubCategory.value._id??"")
     data.append('subCategoryName',this.updateSubCategory.value.subCategoryName??"")
     data.append('image',this.updateSubCategory.value.image??"")
     data.append('categoryId',this.updateSubCategory.value.categoryId??"")
     this.subCategory.updateapi(data).subscribe((res:any)=>{
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




