const mongoose=require('mongoose')
const customerSchema=new mongoose.Schema({
    customerId:{type:Number,default:0},
    firstName:{type:String,default:''},
    lastName:{type:String,default:''},
    dob:{type:String,default:0},
    gender:{type:String,default:''},
    email:{type:String,default:''},
    password:{type:String,default:''},
    phone:{type:String,default:''},
    address:{type:String,default:''},
    userId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:'user'},
    
})
module.exports=new mongoose.model('customer',customerSchema)