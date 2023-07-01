import { Component } from '@angular/core';
import { ReservationService } from '../shared/reservation/reservation.service';
import { AuthService } from '../shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent {

  constructor(private reservation:ReservationService, private auth:AuthService, private toastr:ToastrService){}
  bookings:any[] = []
  ngOnInit(): void {
    this.getAllBookings()
  }

  getAllBookings(){
    this.reservation.all({userId:this.auth.getId()}).subscribe((res:any)=>{
      if(res.success)
      {
        this.bookings = res.data
        // this.toastr.success(res.message)
      }
      else this.toastr.error(res.message)
    })
  }

  checkStatus(id:any, status:any){
    this.reservation.status({_id:id, status:status}).subscribe((res:any)=>{
      if(res.success)
      {
        this.getAllBookings()
        // this.toastr.success(res.message)
      }
      else this.toastr.error(res.message)
    })
  }
}
