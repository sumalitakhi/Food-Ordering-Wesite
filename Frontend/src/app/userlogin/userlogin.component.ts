import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth/auth.service';
import { UserService } from '../shared/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
  loginForm=new FormGroup({
    'email':new FormControl('',[Validators.required]),
    'password':new FormControl()
  })



constructor(private authService:AuthService,private _user:UserService,private toastr:ToastrService,private router:Router){

}



  ngOnInit(): void {

  }
  login(){
    this._user.customerLogin(this.loginForm.value).subscribe((res:any)=>{
      console.log(res)
      if(res.success){
        if(res.data.userType == 2){
          this.authService.storedata(res)
          this.toastr.success(res.message,"success")
          this.router.navigateByUrl('/userlayout/home')
        }
        else this.toastr.error("No User Found")
      }
      else{
        this.toastr.error(res.message)
      }
    })

  }

}
