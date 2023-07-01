const jwt=require('jsonwebtoken')
const secretKey='sumalineerja0209'
module.exports=(req,res,next)=>{
    let token=req.headers['authorization']
if(!!token)
    jwt.verify(token,secretKey,(err,data)=>{
        if(err)
            res.send({success:false,message:'unauthorized user'})
        else
            next()
    })
else
    res.send({success:false,status:400,message:'No Token Found'})
}