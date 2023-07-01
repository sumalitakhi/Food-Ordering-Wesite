import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../shared/reservation/reservation.service';
import { ToastrService } from 'ngx-toastr';
import { TableService } from '../shared/table/table.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-table-reservation',
  templateUrl: './table-reservation.component.html',
  styleUrls: ['./table-reservation.component.css']
})
export class TableReservationComponent implements OnInit {
  tables:any[]=[]
  addForm=new FormGroup({
    '_id':new FormControl('',[Validators.required]),
    'name':new FormControl('',[Validators.required]),
    'userId': new FormControl('',[Validators.required]),
    'tableId':new FormControl('',[Validators.required]),
    'date':new FormControl('',[Validators.required]),
    'time':new FormControl('',[Validators.required]),
    'description':new FormControl('',[Validators.required])

  })
constructor(private reservation:ReservationService,private toastr:ToastrService,private tableservice:TableService,private activatedroute:ActivatedRoute,private authservice:AuthService,private router:Router){}

ngOnInit(): void {
  this.addForm.patchValue({'tableId':this.activatedroute.snapshot.paramMap.get('_id')})
  this.addForm.patchValue({'userId':this.authservice.getId()})
}


submit(){
  this.reservation.addapi(this.addForm.value).subscribe((res:any)=>{
    if(res.success)
    {
      this.toastr.success('success',res.message)
      this.addForm.reset()

    }
    else{
      this.toastr.error('try again',res.message)
    }
  }
  )
}
clear(){
  this.addForm.reset()
}
}
