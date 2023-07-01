import { Component, OnInit } from '@angular/core';
import { ContactService } from '../shared/contact/contact.service';

@Component({
  selector: 'app-admincontact',
  templateUrl: './admincontact.component.html',
  styleUrls: ['./admincontact.component.css']
})
export class AdmincontactComponent implements OnInit{
  contacts:any[]=[]
constructor(private contact:ContactService){}
ngOnInit(): void {
 this.getAllContact() 
}
getAllContact(){
this.contact.getAll({}).subscribe((res:any)=>{
if(res.success){
  this.contacts=res.data
}
else{
 console.log('No list show')
}
})
}
}
