const mongoose=require('mongoose')
const contactSchema=new mongoose.Schema({
    contactId:{type:Number,default:0},
    message:{type:String,default:''},
    email:{type:String,default:''},
    name:{type:String,default:''},
    createdAt:{type:Date,default:Date.now},
    status:{type:Boolean,default:true}
})
module.exports=new mongoose.model('contact',contactSchema)