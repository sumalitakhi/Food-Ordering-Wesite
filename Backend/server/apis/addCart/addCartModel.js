const mongoose=require('mongoose')
const cartSchema= new mongoose.Schema({
    productId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:('product')}, 
    userId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:('user')}, 
    quantity:{type:Number,default:''},
    createdAt:{type:Date,default:Date.now},
    status:{type:Boolean,default:true}
})
module.exports=new mongoose.model('cart',cartSchema)