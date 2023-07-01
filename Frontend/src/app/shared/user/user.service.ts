import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  ADMINBASEURL:any
  CUSTOMERBASEURL:any
  constructor(private _http:HttpClient,@Inject('adminbaseurl') _adminbaseurl:any,@Inject('customerbaseurl') _customerbaseurl:any, private auth:AuthService) 
  {
    this.ADMINBASEURL=_adminbaseurl
    this.CUSTOMERBASEURL=_customerbaseurl
   }
   adminLogin(data:any){
    return this._http.post(this.ADMINBASEURL+'login',data)
   }
   customerLogin(data:any){
    return this._http.post(this.CUSTOMERBASEURL+'login',data)
    }
    registerLogin(data:any){
      return this._http.post(this.CUSTOMERBASEURL+'add',data)
    }
    getAll(data:any){
      let headerObj = new HttpHeaders().set('Authorization', this.auth.getToken() ?? '')
      return this._http.post(this.CUSTOMERBASEURL+'all', data, {headers:headerObj})
    }
    
    singleCustomer(data:any){
      let headerObj = new HttpHeaders().set('Authorization', this.auth.getToken() ?? '')
      return this._http.post(this.CUSTOMERBASEURL+'single', data, {headers:headerObj})
    }
    updateCustomer(data:any){
      let headerObj = new HttpHeaders().set('Authorization', this.auth.getToken() ?? '')
      return this._http.post(this.CUSTOMERBASEURL+'update', data, {headers:headerObj})
    }
    changeStatus(data:any){
      let headerObj = new HttpHeaders().set('Authorization', this.auth.getToken() ?? '')
      return this._http.post(this.CUSTOMERBASEURL+'status', data, {headers:headerObj})
    }

    dashboard(){
      let headerObj = new HttpHeaders().set('Authorization', this.auth.getToken() ?? '')
      return this._http.get(this.ADMINBASEURL+'dashboard', {headers:headerObj})
    }

    updatePassword(data:any){
      let headerObj = new HttpHeaders().set('Authorization', this.auth.getToken() ?? '')
      return this._http.post(this.ADMINBASEURL+'adminPassword',data, {headers:headerObj})
    }
}

