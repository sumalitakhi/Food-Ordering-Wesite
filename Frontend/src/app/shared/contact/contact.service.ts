import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  CUSTOMERBASEURL:any
  ADMINBASEURL:any
  constructor(private http:HttpClient,@Inject('customerbaseurl')_baseurl:any,@Inject('adminbaseurl')_adminbaseurl:any) 
  {
    this.CUSTOMERBASEURL=_baseurl
    this.ADMINBASEURL=_adminbaseurl
   }
   addapi(form:any){
    return this.http.post(this.CUSTOMERBASEURL+'contact/add',form)
   }
   getAll(form:any){
    return this.http.post(this.ADMINBASEURL+'/contact/all',form)
   }
}
