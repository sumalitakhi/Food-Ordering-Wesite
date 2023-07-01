const mongoose=require('mongoose')
const employeeSchema=new mongoose.Schema({
    employeeId:{type:Number,default:0},
    name:{type:String,default:''},
    email:{type:String,default:''},
    phone:{type:String,default:0},
    address:{type:String,default:''},
    gender:{type:String,default:''},
    dateJoining:{type:Date,default:''},
    experience:{type:String,default:''},
    designation:{type:String,default:''},
    createdAt:{type:Date,default:Date.now},
    status:{type:Boolean,default:true}
})
module.exports= new mongoose.model('employee',employeeSchema)