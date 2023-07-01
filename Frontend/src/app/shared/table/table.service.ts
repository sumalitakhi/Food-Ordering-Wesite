import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  ADMINBASEURL:any
  CUSTOMERBASEURL:any
  token:any
  constructor(private http:HttpClient,@Inject('adminbaseurl')_baseurl:any,@Inject('customerbaseurl')_customerbaseurl:any,private authservice:AuthService) {
    this.ADMINBASEURL=_baseurl
    this.CUSTOMERBASEURL=_customerbaseurl
    this.token=this.authservice.getToken()
   }
   addapi(form:any){
    var header_object=new HttpHeaders().set('Authorization',this.token)
    return this.http.post(this.ADMINBASEURL+'table/add',form,{headers:header_object})
   }

   getAll(form:any){
    return this.http.post(this.ADMINBASEURL+'table/all',form)
   }

   getSingle(form:any){
    return this.http.post(this.ADMINBASEURL+'table/single',form)
   }

   getUpdate(form:any){
    var header_object=new HttpHeaders().set('Authorization',this.token)
    return this.http.post(this.ADMINBASEURL+'table/update',form,{headers:header_object})
   }

   deleteapi(form:any){
    var header_object=new HttpHeaders().set('Authorization',this.token)
    return this.http.post(this.ADMINBASEURL+'table/status',form,{headers:header_object})
   }
}
