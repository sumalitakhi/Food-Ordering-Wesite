import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit {
constructor(private authservice:AuthService,private toastr:ToastrService,private router:Router){}
 ngOnInit(): void {
   
 }
logout(){
  this.authservice.removedata()
  this.toastr.success('logout','successfully')
  this.router.navigateByUrl('/adminlogin')
}
}

