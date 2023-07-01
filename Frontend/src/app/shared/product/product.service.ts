import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  globalbaseurl:any
  token:any


  constructor(private http:HttpClient,@Inject('adminbaseurl')_baseurl:any ,private authservice:AuthService) {
    this.globalbaseurl=_baseurl
    this.token=this.authservice.getToken()

  }

addapi(form:any){
  var header_object=new HttpHeaders().set("Authorization",this.token)
  return this.http.post(this.globalbaseurl+"product/add",form,{headers:header_object})
}


  getAllProduct(form:any){
    return this.http.post(this.globalbaseurl+"product/all",form)
  }

  deleteProduct(form:any){
    var header_object=new HttpHeaders().set("Authorization",this.token)
    return this.http.post(this.globalbaseurl+"product/status",form,{headers:header_object})
  }
  updateProduct(form:any){
    var header_object=new HttpHeaders().set("Authorization",this.token)
    return this.http.post(this.globalbaseurl+"product/update",form,{headers:header_object})
  }
  getSingle(form:any){
    return this.http.post(this.globalbaseurl+'product/single',form)
   }
}
