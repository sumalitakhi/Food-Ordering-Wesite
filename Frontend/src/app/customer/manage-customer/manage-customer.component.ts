import { Component, Inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.css']
})
export class ManageCustomerComponent implements OnInit {


IMGURL:any
  customers:any[] = []
  isblock:boolean=false
  constructor(private user:UserService,private Toastr:ToastrService){
    
  }

  ngOnInit(): void {

    this.getAllCustomers()
  }


 
  getAllCustomers(){
    this.user.getAll({}).subscribe((res:any)=>{
      if(res.success){
        this.customers = res.data

      }
      else{

      }
    })
  }

  changeStatus(id:any,status:string){
  this.user.changeStatus({_id:id,status:status}).subscribe((res:any)=>{
    if(res.success){
     
      this.getAllCustomers()
    }
    else{
      this.Toastr.error(res.message)
    }
  })

  }
}
