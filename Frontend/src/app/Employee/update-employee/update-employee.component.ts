import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/shared/employee/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})

export class UpdateEmployeeComponent implements OnInit {
  addForm=new FormGroup({
    '_id':new FormControl('',[Validators.required]),
    'name':new FormControl('',[Validators.required]),
    'email':new FormControl('',[Validators.required]),
    'phone':new FormControl('',[Validators.required]),
    'address':new FormControl('',[Validators.required]),
    'gender':new FormControl('',[Validators.required]),
    'dateJoining':new FormControl('',[Validators.required]),
    'experience':new FormControl('',[Validators.required]),
    'designation':new FormControl('',[Validators.required])
  })
constructor(private employee:EmployeeService,private toastr:ToastrService,private router:Router,private activatedroute:ActivatedRoute){}
ngOnInit(): void {
  this.addForm.patchValue({'_id':this.activatedroute.snapshot.paramMap.get('_id')})
  this.getSingleDetails(this.activatedroute.snapshot.paramMap.get('_id'))
}

getSingleDetails(id:any){
  this.employee.getSingle({_id:id}).subscribe((res:any)=>{
    var result=res.data
    this.addForm.patchValue({'name':result.name}) 
    this.addForm.patchValue({'email':result.email}) 
    this.addForm.patchValue({'phone':result.phone}) 
    this.addForm.patchValue({'address':result.address}) 
    this.addForm.patchValue({'gender':result.gender}) 
    this.addForm.patchValue({'dateJoining':result.dateJoining}) 
    this.addForm.patchValue({'experience':result.experience}) 
    this.addForm.patchValue({'designation':result.designation}) 
   
  })
}
  submit(){
    
    this.employee.getUpdate(this.addForm.value).subscribe(
      (res:any)=>{
      if(res.success){
        this.toastr.success('success',res.message)
        this .router.navigateByUrl('adminlayout/Employee/manage-employee')
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
