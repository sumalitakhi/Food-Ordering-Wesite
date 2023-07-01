const mongoose=require('mongoose')
const userSchema=new mongoose.schema({
    userId:{type:String},
    date:{type:Date},
    description:{type:String},
    tableId:{type:String},
    createdAt:{type:Date},
    status:{type:Boolean}
})