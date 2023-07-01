const mongoose=require('mongoose')
const orderSchema= new mongoose.Schema({
    orderId:{type:Number,default:0},
    amount:{type:Number,default:0},
    userId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:'user'},
    name:{type:String,default:''},
    contact:{type:String,default:''},
    paymentType:{type:String,default:''},
    cardName:{type:String,default:''},
    cardNumber:{type:String,default:''},
    cvv:{type:String,default:''},
    expDate:{type:String,default:''},
    address:{type:String,default:''},
    createdAt:{type:Date,default:Date.now},
    status:{type:String,default:'Pending'} //  Canceled, Completed, Approved, Declined
})
module.exports=new mongoose.model('myOrder',orderSchema)