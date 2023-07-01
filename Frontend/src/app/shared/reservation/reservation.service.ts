import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService  implements OnInit{
 CUSTOMERBASEURl:any
 token:any
  constructor(private http:HttpClient, @Inject('customerbaseurl')_baseurl:any,private authservice:AuthService) {
    this.CUSTOMERBASEURl=_baseurl
    this.token=this.authservice.getToken()
   }
  ngOnInit(): void {
    
  }
  addapi(form:any){
    var header_object=new HttpHeaders().set('Authorization',this.token)
    return this.http.post(this.CUSTOMERBASEURl+'booking/add',form,{headers:header_object})
  }
  all(form:any){
    var header_object=new HttpHeaders().set('Authorization',this.token)
    return this.http.post(this.CUSTOMERBASEURl+'booking/all',form,{headers:header_object})
  }
  status(form:any){
    var header_object=new HttpHeaders().set('Authorization',this.token)
    return this.http.post(this.CUSTOMERBASEURl+'booking/status',form,{headers:header_object})
  }
 
}
