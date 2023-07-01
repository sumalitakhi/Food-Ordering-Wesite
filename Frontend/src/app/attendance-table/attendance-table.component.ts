import { Component } from '@angular/core';
import { EmployeeService } from '../shared/employee/employee.service';
import { ToastrService } from 'ngx-toastr';
import { AttendanceService } from '../shared/attendance/attendance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance-table',
  templateUrl: './attendance-table.component.html',
  styleUrls: ['./attendance-table.component.css']
})
export class AttendanceTableComponent {
  attendenceData:any[]=[]
  employees:any[]=[]
  employeeId:any = ''
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

 getAttendence(){
  this.attendance.getAll({employeeId:this.employeeId}).subscribe((res:any)=>{
    if(res.success){
      this.attendenceData=res.data
      this.toastr.success(res.message,'Employees')
    }
    else{
      this.toastr.error(res.message,'Error')
    }
  })
 }
}
