import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  ADMINBASEURL:any
  token:any
  constructor(private http:HttpClient,@Inject('adminbaseurl')_baseurl:any,private auth:AuthService) { 
    this.ADMINBASEURL=_baseurl
    this.token=this.auth.getToken()
  }
  addapi(form:any){
    var header_object=new HttpHeaders().set('Authorization',this.token)
    return this.http.post(this.ADMINBASEURL+'employee/add',form,{headers:header_object})
  }
  getAll(form:any){
    var header_object=new HttpHeaders().set('Authorization',this.token)
    return this.http.post(this.ADMINBASEURL+'employee/all',form,{headers:header_object})
  }
  

  getSingle(form:any){
    return this.http.post(this.ADMINBASEURL+'employee/single',form)
   }

   getUpdate(form:any){
    var header_object=new HttpHeaders().set('Authorization',this.token)
    return this.http.post(this.ADMINBASEURL+'employee/update',form,{headers:header_object})
   }

  deleteapi(form:any){
    var header_object=new HttpHeaders().set('Authorization',this.token)
    return this.http.post(this.ADMINBASEURL+'employee/status',form,{headers:header_object})
  }
}
