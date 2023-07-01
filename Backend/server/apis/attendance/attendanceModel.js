const mongoose=require('mongoose')
const attendanceSchema= new mongoose.Schema({
    employeeId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:'employee'},
    attendance:{type:String,default:''},
    date:{type:Date,default:Date.now},
    createdAt:{type:Date,default:Date.now},
    status:{type:Boolean,default:true}
})
module.exports=new mongoose.model("attendance",attendanceSchema)