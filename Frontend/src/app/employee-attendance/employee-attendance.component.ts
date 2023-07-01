import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee/employee.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from '../shared/attendance/attendance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrls: ['./employee-attendance.component.css']
})
export class EmployeeAttendanceComponent implements OnInit {
  employees:any[]=[]
  addForm=new FormGroup({
    'employeeId':new FormControl('',[Validators.required]),
    'attendance':new FormControl('',[Validators.required]),
    'date':new FormControl('')
  })
  constructor(private employee:EmployeeService,private toastr:ToastrService,private attendance:AttendanceService,private router:Router){}
   ngOnInit(): void {
    this.getAllEmployee()
   }
  getAllEmployee(){
    this.employee.getAll({status:'true'}).subscribe((res:any)=>{
      if(res.success){
        this.employees=res.data
        this.toastr.success(res.message,'Employees')
      }
      else{
        this.toastr.error(res.message,'Error')
      }
    })
  }
  submit(){
    // console.log(this.addForm.value);

    this.attendance.addapi(this.addForm.value).subscribe((res:any)=>{
      if(res.success){
        this.toastr.success(res.message,"successfull")
        this.router.navigateByUrl('adminlayout/attendance-table')
      }
      else{
        this.toastr.error(res.message)
      }
    })
  }
}
