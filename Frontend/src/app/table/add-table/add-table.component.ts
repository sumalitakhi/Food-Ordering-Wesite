import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TableService } from 'src/app/shared/table/table.service';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.css']
})
export class AddTableComponent implements OnInit {
  addForm=new FormGroup({
    'tableName':new FormControl('',[Validators.required]),
    'description':new FormControl('',[Validators.required]),
    'seats':new FormControl('',[Validators.required]),
    'image':new FormControl('',[Validators.required]),
  })
constructor(private tableservice:TableService,private toastr:ToastrService,private router:Router){}
ngOnInit(): void {
  
}
uploadimage(event:any){
  this.addForm.patchValue({'image':event.target.files[0]})
}
  submit(){
    var data=new FormData()
      data.append('tableName',this.addForm.value.tableName??"")
      data.append('description',this.addForm.value.description??"")
      data.append('seats',this.addForm.value.seats??"")
      data.append('image',this.addForm.value.image??"")
    this.tableservice.addapi(data).subscribe(
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
