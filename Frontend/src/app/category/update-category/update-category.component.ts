import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/shared/category/category.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  addCategory=new FormGroup({
    "_id":new FormControl('',[Validators.required]),
    "categoryName":new FormControl("",[Validators.required]),
    'image':new FormControl("",[Validators.required])
  })

constructor(private category:CategoryService,private toastr:ToastrService,private router:Router,private activatedroute:ActivatedRoute){}

  ngOnInit(): void {
    this.addCategory.patchValue({'_id':this.activatedroute.snapshot.paramMap.get('_id')})
    this.getsingleDetails(this.activatedroute.snapshot.paramMap.get('_id'))
  }
  uploadimage(event:any){
    this.addCategory.patchValue({'image':event.target.files[0]})
  }



  getsingleDetails(id:any){
    this.category.getSingle({_id:id}).subscribe((res:any)=>{
      var result=res.data
      this.addCategory.patchValue({'categoryName':result.categoryName})
    })


  }
  submit(){
    var data=new FormData()
    data.append('_id',this.addCategory.value._id??"")
    data.append('categoryName',this.addCategory.value.categoryName??"")
    data.append('image',this.addCategory.value.image??"")

    this.category.updateCategory(data).subscribe(
      (res:any)=>{
      if(res.success){
        this.toastr.success('success',res.message)
        this .router.navigateByUrl('adminlayout/category/manage-category')
      
      }
      else{
        this.toastr.error('tryAgain',res.message)
      }
    }
   
    )

    
  }

}

