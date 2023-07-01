const mongoose=require('mongoose')
const orderDetailSchema= new mongoose.Schema({
    orderId:{type:mongoose.Schema.Types.ObjectId,default:null, ref:'order'},
    productId:{type:mongoose.Schema.Types.ObjectId,default:null, ref:'product'},
    quantity:{type:Number,default:0},
    price:{type:Number,default:0}
})
module.exports=new mongoose.model('orderDetail',orderDetailSchema)