import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 constructor(private authservice:AuthService,private toastr:ToastrService,private router:Router){}
 canActivate():boolean{
    if(this.authservice.getToken()==null)
    {
      this.toastr.error("Unauthori user")
      this.router.navigateByUrl("/adminlogin")
      return false
    }
    else
    return true
 }
}
