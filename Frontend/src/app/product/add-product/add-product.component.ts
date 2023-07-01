import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/shared/category/category.service';
import { ProductService } from 'src/app/shared/product/product.service';
import { SubCategoryService } from 'src/app/shared/sub-category/sub-category.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {


  addForm=new FormGroup({
    subCategoryId: new FormControl("",[Validators.required]),
    categoryId: new FormControl("",[Validators.required]),
    productName: new FormControl("",[Validators.required]),
    price: new FormControl("",[Validators.required]),
    description: new FormControl("",[Validators.required]),
    image:new FormControl("",[Validators.required])
   })
  categories:any[] = []
  subcategories:any[] = []
  constructor(private category:CategoryService, private toastr:ToastrService, private subCategory:SubCategoryService,private router:Router, private product:ProductService){}

  ngOnInit(): void {
    this.getAllCategories()
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


  getAllSubCategories(){
    this.subCategory.getAllSubCategory({status:'true', categoryId:this.addForm.value.categoryId}).subscribe((res:any)=>{
      if(res.success){
        this.subcategories = res.data
      }
      else{

      }
    })
  }

  uploadimage(event:any){
    this.addForm.patchValue({'image':event.target.files[0]})
   }
   submit(){
    var data=new FormData
    data.append('subCategoryId',this.addForm.value.subCategoryId??"")
    data.append('image',this.addForm.value.image??"")
    data.append('categoryId',this.addForm.value.categoryId??"")
    data.append('productName',this.addForm.value.productName??"")
    data.append('price',this.addForm.value.price??"")
    data.append('description',this.addForm.value.description??"")
    this.product.addapi(data).subscribe((res:any)=>{
      if(res.success){
        this.toastr.success(res.message,"successfull")
        this.router.navigateByUrl('/adminlayout/product/manage-product')
      }
      else{
        this.toastr.error(res.message)
      }

    })
  }
}
