import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { CategoryService } from 'src/app/shared/category/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit{
addCategory=new FormGroup({
  'categoryName':new FormControl('',[Validators.required]),
  'image':new FormControl('',[Validators.required])
})
  constructor(private category:CategoryService,private toastr:ToastrService,private router:Router, private auth:AuthService){}
  ngOnInit(): void{
    
  }
  uploadimage(event:any){
    this.addCategory.patchValue({'image':event.target.files[0]})
  }

submit(){
  var  data = new FormData()
  data.append('categoryName', this.addCategory.value.categoryName ?? "")
  data.append('image', this.addCategory.value.image ?? '')
  this.category.addapi(data).subscribe((res:any)=>{
    if(res.success){
      this.toastr.success(res.message,"successfull")
      this.router.navigateByUrl('/adminlayout/category/manage-category')
    }
    else{
      this.toastr.error(res.message)
    }

  })
}
}
