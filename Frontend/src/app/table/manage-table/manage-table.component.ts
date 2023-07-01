import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { TableService } from 'src/app/shared/table/table.service';

@Component({
  selector: 'app-manage-table',
  templateUrl: './manage-table.component.html',
  styleUrls: ['./manage-table.component.css']
})
export class ManageTableComponent implements OnInit {
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

delete(id:any){
  this.tableservice.deleteapi({_id:id,status:'false'}).subscribe((res:any)=>{
    if(res.success){
      this.toastr.success(res.message,'Delete')
    }
    else{
      this.toastr.error(res.message,'Error')
    }
  })
}
}
