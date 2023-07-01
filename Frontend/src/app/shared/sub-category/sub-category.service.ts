import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  globalbaseurl:any
  token:any





  constructor(private http:HttpClient,@Inject('adminbaseurl')_baseurl:any,private auth:AuthService) {
    this.globalbaseurl=_baseurl

    this.token=this.auth.getToken()

  }

  addapi(form:any){
    var header_object=new HttpHeaders().set("Authorization",this.token)
    return this.http.post(this.globalbaseurl+'subCategory/add',form,{headers:header_object})
  }
  updateapi(form:any){
    var header_object=new HttpHeaders().set("Authorization",this.token)
    return this.http.post(this.globalbaseurl+'subCategory/update',form,{headers:header_object})
  }

  getAllSubCategory(form:any){
    return this.http.post(this.globalbaseurl+"subCategory/all",form)
  }
  getSingleSubCategory(form:any){
    return this.http.post(this.globalbaseurl+"subCategory/single",form)
  }
  deleteSubCategory(form:any){
    var header_object=new HttpHeaders().set('Authorization',this.token)
    return this.http.post(this.globalbaseurl+'subCategory/status',form,{headers:header_object})
  }
}
