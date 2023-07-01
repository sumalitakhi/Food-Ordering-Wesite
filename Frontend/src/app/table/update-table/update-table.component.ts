import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TableService } from 'src/app/shared/table/table.service';

@Component({
  selector: 'app-update-table',
  templateUrl: './update-table.component.html',
  styleUrls: ['./update-table.component.css']
})
export class UpdateTableComponent implements OnInit {
  addForm=new FormGroup({
    '_id':new FormControl('',[Validators.required]),
    'tableName':new FormControl('',[Validators.required]),
    'description':new FormControl('',[Validators.required]),
    'seats':new FormControl('',[Validators.required]),
    'image':new FormControl('',[Validators.required]),
  })
constructor(private tableservice:TableService,private toastr:ToastrService,private router:Router,private activatedroute:ActivatedRoute){}
ngOnInit(): void {
  this.addForm.patchValue({'_id':this.activatedroute.snapshot.paramMap.get('_id')})
  this.getSingleDetails(this.activatedroute.snapshot.paramMap.get('_id'))
}
uploadimage(event:any){
  this.addForm.patchValue({'image':event.target.files[0]})
}

getSingleDetails(id:any){
  this.tableservice.getSingle({_id:id}).subscribe((res:any)=>{
    var result=res.data
    this.addForm.patchValue({'tableName':result.tableName}) 
    // this.addForm.patchValue({'image':result.image})
    this.addForm.patchValue({'seats':result.seats})
    this.addForm.patchValue({'description':result.description})
  })
}
  submit(){
    var data=new FormData()
      data.append('_id',this.addForm.value._id??"")
      data.append('tableName',this.addForm.value.tableName??"")
      data.append('description',this.addForm.value.description??"")
      data.append('seats',this.addForm.value.seats??"")
      data.append('image',this.addForm.value.image??"")
    this.tableservice.getUpdate(data).subscribe(
      (res:any)=>{
      if(res.success){
        this.toastr.success('success',res.message)
        this .router.navigateByUrl('adminlayout/table/manage-table')
        this.addForm.reset()
      }
      else{
        this.toastr.error('tryAgain',res.message)
      }
    },
    err=>{
      console.log(err)
    }
    )

    
  }

}
