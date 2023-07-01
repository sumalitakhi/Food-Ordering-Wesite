const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/mean')
.then(()=>{
    console.log('Db connected')
})
.catch((err)=>{
    console.log('Db error',err)
})