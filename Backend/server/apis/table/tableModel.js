const mongoose=require('mongoose')
const tableSchema=new mongoose.Schema({
    tableId:{type:Number,default:0},
    tableName:{type:String,default:''},
    image:{type:String,default:''},
    description:{type:String,default:''},
    seats:{type:Number,default:0},
    createdAt:{type:Date,default:Date.now},
    status:{type:Boolean,default:true}
})
module.exports= new mongoose.model('table',tableSchema)