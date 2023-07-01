import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  storedata(res:any){
    sessionStorage.setItem("_id",res.data._id)
    sessionStorage.setItem('token',res.token)
  }
  getId(){
    return sessionStorage.getItem('_id')
  }
  getToken(){
    return sessionStorage.getItem('token')
  }
  removedata(){
    sessionStorage.removeItem('_id')
    sessionStorage.removeItem('token')
  }

}
 