import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/shared/employee/employee.service';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css']
})
export class ManageEmployeeComponent implements OnInit {
employees:any[]=[]
constructor(private employee:EmployeeService,private toastr:ToastrService){}
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

delete(_id:any){
  this.employee.deleteapi({_id:_id,status:'false'}).subscribe((res:any)=>{
    if(res.success){
      this.toastr.success(res.message,'Delete')
      this.getAllEmployee()
    }
    else{
      this.toastr.error(res.message,'Error')
    }
  })
}
}
