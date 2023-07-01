import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/user/user.service';
import { AuthService } from '../shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-userprofile',
  templateUrl: './update-userprofile.component.html',
  styleUrls: ['./update-userprofile.component.css']
})
export class UpdateUserprofileComponent {
  registerForm = new FormGroup({
    '_id': new FormControl(''),
    'firstName': new FormControl(''),
    'lastName': new FormControl(''),
    'dob': new FormControl(''),
    'gender': new FormControl(''),
    'email': new FormControl(''),
    'password': new FormControl(''),
    'phone': new FormControl(''),
    'address': new FormControl('')
  })


  constructor(private _user: UserService, private auth: AuthService, private toastr: ToastrService, private router: Router) { }


  ngOnInit(): void {
    this.getCustomer()
  }

  getCustomer(){
    this._user.singleCustomer({_id:this.auth.getId()}).subscribe((res: any) => {
      if (res.success) {
        this.registerForm.patchValue({_id:this.auth.getId()})
        this.registerForm.patchValue({firstName:res.data.firstName})
        this.registerForm.patchValue({lastName:res.data.lastName})
        this.registerForm.patchValue({dob:res.data.dob})
        this.registerForm.patchValue({gender:res.data.gender})
        this.registerForm.patchValue({email:res.data.email})
        this.registerForm.patchValue({phone:res.data.phone})
        this.registerForm.patchValue({address:res.data.address})
      }
      else {
        this.toastr.error(res.message)
      }
    })
  }
  submit() {
    this._user.updateCustomer(this.registerForm.value).subscribe((res: any) => {
      if (res.success) {
        this.toastr.success(res.message, 'successfull')
        this.getCustomer()
        this.router.navigateByUrl('/userlayout/home')
      }
      else {
        this.toastr.error(res.message)
      }
    })

  }
}

