const mongoose=require('mongoose')
const feedbackSchema=new mongoose.Schema({
    feedbackId:{type:Number,default:0},
    email:{type:String,default:''},
    message:{type:String,default:''},
    name:{type:String,default:''},
    phone:{type:String,default:''},
    createdAt:{type:Date,default:Date.now},
    status:{type:Boolean,default:true}
})
module.exports= new mongoose.model('feedback',feedbackSchema)