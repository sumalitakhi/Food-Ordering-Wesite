const mongoose=require('mongoose')
const productSchema=new mongoose.Schema({
    productId:{type:Number,default:0},
    categoryId:{type:mongoose.Schema.Types.ObjectId,default:null, ref:'category'},
    subCategoryId:{type:mongoose.Schema.Types.ObjectId,default:null, ref:'subCategory'},
    productName:{type:String,default:''},
    image:{type:String,default:''},
    price:{type:Number,default:0},
    description:{type:String,default:''},
    createdAt:{type:Date, default: Date.now},
    status:{type:Boolean,default:true}
})
module.exports=new mongoose.model('product',productSchema)