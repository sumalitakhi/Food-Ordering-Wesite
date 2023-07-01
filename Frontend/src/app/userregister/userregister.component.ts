import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/user/user.service';
import { AuthService } from '../shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userregister',
  templateUrl: './userregister.component.html',
  styleUrls: ['./userregister.component.css']
})
export class UserregisterComponent implements OnInit {
registerForm=new FormGroup({
  'firstName':new FormControl('',[Validators.required]),
  'lastName':new FormControl('',[Validators.required]),
  'dob':new FormControl('',[Validators.required]),
  'gender':new FormControl('',[Validators.required]),
  'email':new FormControl('',[Validators.required]),
  'password':new FormControl('',[Validators.required]),
  'phone':new FormControl('',[Validators.required]),
  'address':new FormControl('',[Validators.required])
})
  private _userservice: any;

constructor(private _user:UserService,private auth:AuthService,private toastr:ToastrService,private router:Router){}


  ngOnInit(): void {
    
  }
submit(){
  this._user.registerLogin(this.registerForm.value).subscribe((res:any)=>{
    if(res.success){
      this.auth.storedata(res)
      this.toastr.success(res.message,'successfull')
      this.router.navigateByUrl('/userlogin')
    }
    else{
      this.toastr.error(res.message)
    }
  })

}
clear(){
  this.registerForm.reset()
}
}
