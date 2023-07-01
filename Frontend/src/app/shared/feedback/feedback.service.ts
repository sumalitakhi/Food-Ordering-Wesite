import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  CUSTOMERBASEURL:any
  ADMINBASEURL:any
  token:any
  constructor(private http:HttpClient,@Inject('customerbaseurl') _baseurl:any,private authservice:AuthService,@Inject('adminbaseurl')_adminbaseurl:any) 
  { 
    this.CUSTOMERBASEURL=_baseurl
    this.ADMINBASEURL=_adminbaseurl
    this.token=this.authservice.getToken()
  }
  addapi(form:any){
    return this.http.post(this.CUSTOMERBASEURL+'feedback/add',form)
  }
  getAll(form:any){
    return this.http.post(this.ADMINBASEURL+'feedback/all',form)
  }
}
