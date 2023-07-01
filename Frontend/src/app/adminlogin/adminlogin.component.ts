import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/auth/auth.service';
import { UserService } from '../shared/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  loginForm=new FormGroup({
    'email':new FormControl(''),
    'password':new FormControl()
  })
  constructor(private authService:AuthService,private _user:UserService,private toastr:ToastrService,private router:Router){

  }
  ngOnInit():void{
  }
  login(){
    this._user.adminLogin(this.loginForm.value).subscribe((res:any)=>{
      console.log(res);
      if(res.success)
      {
        if(res.data.userType == 1){
          this.authService.storedata(res)
          this.toastr.success(res.message,"success")
          this.router.navigateByUrl('/adminlayout/dashboard')
        }
        else
          this.toastr.error("No User Found")
      }
      else{
        this.toastr.error("try Again",res.message)
      }
    })
  }
}

