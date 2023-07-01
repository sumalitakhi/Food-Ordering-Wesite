const db=require('./Server/config/db')
const seed=require('./server/config/seed')
const customerRoutes=require('./server/routes/customerRoutes')
const adminRoutes=require('./server/routes/adminRoutes')
const express=require("express")
const app=express()
const cors=require('cors')
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static('server/public/'))
app.get("/",(req,res)=>{
    res.send("welcome to server")
})
app.use('/customer',customerRoutes)
app.use('/admin',adminRoutes)
app.listen(3000,(err)=>{
    if(err){
        console.log("error",err)
    }
    else{
    console.log("server is running")
    }
})