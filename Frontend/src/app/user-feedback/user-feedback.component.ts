import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../shared/feedback/feedback.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.component.html',
  styleUrls: ['./user-feedback.component.css']
})
export class UserFeedbackComponent implements OnInit {
addForm= new FormGroup ({
  'email':new FormControl('',Validators.required),
  'name':new FormControl('',Validators.required),
  'phone':new FormControl('',Validators.required),
  'message':new FormControl('',Validators.required),
})
constructor(private feedbackservice:FeedbackService,private toastr:ToastrService){}
ngOnInit(): void {
  
}
submit(){
  this.feedbackservice.addapi(this.addForm.value).subscribe((res:any)=>{
    if(res.success)
    {
      this.toastr.success('success',res.message)
      this.addForm.reset()
    }
    else{
      this.toastr.error('try again',res.message)
    }
  }
  )
}
}
