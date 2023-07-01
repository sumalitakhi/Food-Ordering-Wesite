import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  globalcustomerbaseurl: any
  globaladminbaseurl: any
  token: any


  constructor(private http: HttpClient, @Inject('customerbaseurl') _basecustomerurl: any, @Inject('adminbaseurl') _baseadminurl: any, private authservice: AuthService) {
    this.globalcustomerbaseurl = _basecustomerurl
    this.globaladminbaseurl = _baseadminurl
    this.token = this.authservice.getToken()

  }

  addOrder(form: any) {
    var header_object = new HttpHeaders().set("Authorization", this.token)
    return this.http.post(this.globalcustomerbaseurl + "order/add", form, { headers: header_object })
  }


  getAllOrder(form: any) {
    var header_object = new HttpHeaders().set("Authorization", this.token)
    return this.http.post(this.globalcustomerbaseurl + "order/all", form, { headers: header_object })
  }

  getOrderDetail(form: any) {
    var header_object = new HttpHeaders().set("Authorization", this.token)
    return this.http.post(this.globalcustomerbaseurl + "details/all", form, { headers: header_object })
  }

  cancelOrder(form: any) {
    var header_object = new HttpHeaders().set("Authorization", this.token)
    return this.http.post(this.globalcustomerbaseurl + "order/status", form, { headers: header_object })
  }

  updateOrder(form: any) {
    var header_object = new HttpHeaders().set("Authorization", this.token)
    return this.http.post(this.globalcustomerbaseurl + "order/update", form, { headers: header_object })
  }
}
