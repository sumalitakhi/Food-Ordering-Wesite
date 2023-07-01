import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { adminbaseurl } from 'src/main';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  ADMINBASEURL:any
  token:any
  constructor(private http:HttpClient,@Inject('adminbaseurl')_baseurl:any, private auth:AuthService) {
    this.ADMINBASEURL=_baseurl
    this.token = auth.getToken()
  }
  addapi(form:any){
    var header_object=new HttpHeaders().set('Authorization',this.token)
    return this.http.post(this.ADMINBASEURL+'attendance/add',form,{headers:header_object})
  }
  getAll(form:any){
    var header_object=new HttpHeaders().set('Authorization',this.token)
    return this.http.post(this.ADMINBASEURL+'attendance/all',form,{headers:header_object})
  }
}
