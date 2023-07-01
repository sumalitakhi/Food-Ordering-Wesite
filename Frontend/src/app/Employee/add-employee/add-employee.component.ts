import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { EmployeeService } from 'src/app/shared/employee/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  addForm=new FormGroup({
    'name':new FormControl('',[Validators.required]),
    'email':new FormControl('',[Validators.required]),
    'phone':new FormControl('',[Validators.required]),
    'address':new FormControl('',[Validators.required]),
    'gender':new FormControl('',[Validators.required]),
    'dateJoining':new FormControl('',[Validators.required]),
    'experience':new FormControl('',[Validators.required]),
    'designation':new FormControl('',[Validators.required])
  })
 constructor( private employeeservice:EmployeeService,private router:Router,private toastr:ToastrService){}
 ngOnInit(): void {
   
 }
 submit(){
  this.employeeservice.addapi(this.addForm.value).subscribe((res:any)=>{
    if(res.success)
    {
      this.toastr.success('success',res.message)
      this.router.navigateByUrl('/adminlayout/Employee/manage-employee')
      this.addForm.reset()
    }
    else{
      this.toastr.error('try again',res.message)
    }
  }
  )
}
clear(){
  this.addForm.reset()
}
}
