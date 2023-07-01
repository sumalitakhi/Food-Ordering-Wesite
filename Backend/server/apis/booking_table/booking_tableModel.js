const mongoose=require('mongoose') 
const bookingSchema=new mongoose.Schema({
   bookingId:{type:Number,default:0},
   userId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:'user'},
   tableId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:'table'},
   date:{type:Date,default:Date.now},
   time:{type:String,default:''},
   name:{type:String,default:''},
   description:{type:String,default:''},
   createdAt:{type:Date,default:Date.now},
   status:{type:String,default:"Pending"}
})
module.exports=new mongoose.model('booking',bookingSchema)