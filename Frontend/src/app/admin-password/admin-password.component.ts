import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-admin-password',
  templateUrl: './admin-password.component.html',
  styleUrls: ['./admin-password.component.css']
})
export class AdminPasswordComponent implements OnInit {
  addForm = new FormGroup({
    '_id': new FormControl('', [Validators.required]),
    'currentPassword': new FormControl('', [Validators.required]),
    'newPassword': new FormControl('', [Validators.required]),
    'confirmPassword': new FormControl('', [Validators.required]),
  })
  constructor(private user: UserService, private toastr: ToastrService, private router: Router,private auth:AuthService) { }
  ngOnInit(): void {

  }
  submit() {
    this.addForm.patchValue({_id:this.auth.getId()})
    if (this.addForm.value.newPassword == this.addForm.value.confirmPassword) {
      this.user.updatePassword(this.addForm.value).subscribe((res: any) => {
        if (res.success) {
          {
            this.toastr.success(res.message, 'successfull')
            this.router.navigateByUrl('') //dashboard
          }


        }
        else {
          this.toastr.error(res.message)
        }
      })
    }
    else {
      this.toastr.error("confirm Password does not match")
    }

  }
}
