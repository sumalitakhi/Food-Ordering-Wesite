import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../shared/contact/contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usercontact',
  templateUrl: './usercontact.component.html',
  styleUrls: ['./usercontact.component.css']
})
export class UsercontactComponent implements OnInit {
  addForm=new FormGroup({
    'message':new FormControl('',[Validators.required]),
    'name':new FormControl('',[Validators.required]),
    'email':new FormControl('',[Validators.required])
  })
constructor(private contact:ContactService,private toastr:ToastrService){}
ngOnInit(): void {

}
submit(){
  this.contact.addapi(this.addForm.value).subscribe((res:any)=>{
    if(res.success)
    {
      this.addForm.reset()
      this.toastr.success(res.message,'successfully')
    }
    else{
      this.toastr.error(res.message,'Error')
    }
  })
}
}
