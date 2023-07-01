import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrls: ['./userheader.component.css']
})
export class UserheaderComponent implements OnInit {

  isLogin:boolean = false
  constructor(private _router:Router, private auth:AuthService){}

  ngOnInit(): void {
    this.checkLogin()
  }

  checkLogin(){
    if(this.auth.getToken()!= null)
      this.isLogin = true
    else
      this.isLogin = false
  }
  
  logout(){
    this._router.navigateByUrl('/userlogin')
    this.auth.removedata()
  }
}
