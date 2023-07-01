import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../shared/feedback/feedback.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-feedback',
  templateUrl: './view-feedback.component.html',
  styleUrls: ['./view-feedback.component.css']
})
export class ViewFeedbackComponent implements OnInit {
  feedback:any[]=[]
constructor(private feedbackservice:FeedbackService,private toastr:ToastrService){}
ngOnInit(): void {
  this.getAllFeedback()
}
getAllFeedback(){
this.feedbackservice.getAll({status:true}).subscribe((res:any)=>{
  if(res.success){
    this.feedback=res.data
    this.toastr.success(res.message,'Feedback')
  }
  else{
    this.toastr.error(res.message,'Error')
  }
})
}
}
