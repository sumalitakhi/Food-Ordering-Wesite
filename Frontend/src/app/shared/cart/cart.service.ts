import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  globalbaseurl:any
  token:any


  constructor(private http:HttpClient,@Inject('customerbaseurl')_baseurl:any ,private authservice:AuthService) {
    this.globalbaseurl=_baseurl
    this.token=this.authservice.getToken()

  }

addcartItem(form:any){
var header_object=new HttpHeaders().set("Authorization",this.authservice.getToken() ?? '')
  return this.http.post(this.globalbaseurl+"cart/add",form,{headers:header_object})
}


  getAllcartItem(form:any){
  var header_object=new HttpHeaders().set("Authorization",this.authservice.getToken() ?? '')
    return this.http.post(this.globalbaseurl+"cart/all",form,{headers:header_object})
  }

  deletecartItem(form:any){
  var header_object=new HttpHeaders().set("Authorization",this.authservice.getToken() ?? '')
    return this.http.post(this.globalbaseurl+"cart/del",form,{headers:header_object})
  }
  updatecartItem(form:any){
  var header_object=new HttpHeaders().set("Authorization",this.authservice.getToken() ?? '')
    return this.http.post(this.globalbaseurl+"cart/update",form,{headers:header_object})
  }
}
