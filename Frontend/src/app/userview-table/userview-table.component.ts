import { Component, Inject, OnInit } from '@angular/core';
import { TableService } from '../shared/table/table.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-userview-table',
  templateUrl: './userview-table.component.html',
  styleUrls: ['./userview-table.component.css']
})
export class UserviewTableComponent implements OnInit {
  IMGURL:any
  tables:any[]=[]
constructor(private tableservice:TableService,private toastr:ToastrService,@Inject('imageurl')_imageurl:any,private sanitizer:DomSanitizer)
{
  this.IMGURL=_imageurl
}
ngOnInit(): void {
  this.getAllTables()
}
getImgSrc(imgPath:any){
  return this.sanitizer.bypassSecurityTrustResourceUrl(this.IMGURL+imgPath)
}
getAllTables(){
  this.tableservice.getAll({status:true}).subscribe((res:any)=>{
    if(res.success){
      this.tables=res.data
      this.toastr.success(res.message,'Show tables')
    }
    else{
      this.toastr.error(res.message,'Error')
    }
  })
}
}
