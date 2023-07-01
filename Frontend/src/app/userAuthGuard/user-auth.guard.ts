import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  constructor(private authservice:AuthService,private toastr:ToastrService,private router:Router){}
 canActivate():boolean{
    if(this.authservice.getToken()==null)
    {
      this.toastr.error('warning',"unautgorized user")
      this.router.navigateByUrl("/userlogin")
      return false
    }
    else
    return true
 }
}
