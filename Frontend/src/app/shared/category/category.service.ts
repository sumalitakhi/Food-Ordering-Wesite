import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  patchValue(arg0: { categoryName: any; }) {
    throw new Error('Method not implemented.');
  }
 
  globalbaseurl:any
  token:any
  

  constructor(private http:HttpClient,@Inject('adminbaseurl')_baseurl:any ,private authservice:AuthService) { 
    this.globalbaseurl=_baseurl
    this.token=this.authservice.getToken()
    
  }

addapi(form:any){
  var header_object=new HttpHeaders().set("Authorization",this.token)
  return this.http.post(this.globalbaseurl+"category/add",form,{headers:header_object})
}


  getAllCategory(form:any){
    return this.http.post(this.globalbaseurl+"category/all",form)
  }

  deleteCategory(form:any){
    var header_object=new HttpHeaders().set("Authorization",this.token)
    return this.http.post(this.globalbaseurl+"category/status",form,{headers:header_object})
  }
  updateCategory(form:any){
    var header_object=new HttpHeaders().set("Authorization",this.token)
    return this.http.post(this.globalbaseurl+"category/update",form,{headers:header_object})
  }
  getSingle(form:any){
    return this.http.post(this.globalbaseurl+'category/single',form)
   }
}
