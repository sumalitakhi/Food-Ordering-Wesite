const customer=require('./customerModel')
const user=require('../user/userModel')
const bcrypt=require('bcrypt')
const addCustomer=async(req,res)=>{
    let validation=''
    if(!req.body.firstName)
        validation+="firstName is required"
    if(!req.body.dob)
        validation+="date of birth is required"
    if(!req.body.gender)
        validation+="gender is required"
    if(!req.body.email)
        validation+="email is required"
    if(!req.body.password)
        validation+="password is required"
    if(!req.body.phone)
        validation+="phone is required"
    if(!req.body.address)
        validation+="address is required"
    if(!!validation)
    res.send({success:false,status:500,message:validation})
    
    let total=await user.countDocuments()
    let newUser= new user({
        userId:total+1,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,10),
        userType:2
    })
    let prevUser= await user.findOne({email:req.body.email})
    if(!!prevUser)
    res.send({success:false,staus:500,message:"user Exists same email"})
    else
    newUser.save()
    .then(async userData=>{
        let totalCustomer=await customer.countDocuments()
    let newCustomer= new customer({
        customerId:totalCustomer+1,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        dob:req.body.dob,
        gender:req.body.gender,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,10),
        phone:req.body.phone,
        address:req.body.address,
        userId:userData._id
    })
    newCustomer.save()
    .then((result)=>{
        res.json({
            success:true,
            staus:200,
            message:"customer added",
            data:result
        })
    }).catch(err=>{
        res.json({
            success:false,
            status:400,
            message:err.message
        })
    })
})
}
    
    


const getAll=(req,res)=>{
    customer.find(req.body).populate('userId')
    .then((result)=>{
        res.json({
            success:true,
            status:true,
            message:"all customer show",
            data:result
        })
    }).catch(err=>{
        res.json({
            success:false,
            status:400,
            message:err.message
        })
    })
}

const getSingle=(req,res)=>{
    let validation=''
    if(!req.body._id)
        validation+='_id is required'
    if(!!validation)
        res.send({success:false,status:500,message:validation})
    else{
    customer.findOne({'userId':req.body._id})
    .then((result)=>{
        res.json({
            success:true,
            status:200,
            message:'single customer show',
            data:result
        })
    }).catch(err=>{
        res.json({
            success:false,
            status:400,
            message:err.message
        })
    })
}}

const updateCustomer=(req,res)=>{
    let validation=""
    if(!req.body._id)
        validation+= "_id is required"
    if(!!validation)
        res.json({
            success:false,
            staus:500,
            message:validation
        })
    else{
        customer.findOne({userId: req.body._id})
        .then(result=>{
            if(result==null)
                res.send({success:false,status:400,message:"No customer found"})
            else{
                if(!!req.body.firstName)
                result.firstName=req.body.firstName
                if(!!req.body.lastName)
                result.lastName=req.body.lastName
                if(!!req.body.dob)
                result.dob=req.body.dob
                if(!!req.body.gender)
                result.gender=req.body.gender
                if(!!req.body.email)
                result.email=req.body.email
                if(!!req.body.password)
                result.password=bcrypt.hashSync(req.body.password,10)
                if(!!req.body.phone)
                result.phone=req.body.phone
                if(!!req.body.address)
                result.address=req.body.address

                result.save()
                .then(async updatedRes=>{
                    let userInfo = await user.findOne({_id:req.body._id})
                    if(!!req.body.firstName)
                        userInfo.firstName=req.body.firstName
                    if(!!req.body.lastName)
                        userInfo.lastName=req.body.lastName
                    if(!!req.body.email)
                        userInfo.email=req.body.email
                    if(!!req.body.password)
                        userInfo.password=bcrypt.hashSync(req.body.password,10)
                    userInfo.save()
                    res.send({success:true,
                    status:200,
                    message:"customer updated",

                })
                }).catch(error=>{
                    res.send({success:false,staus:500,message:error.message})
                })
            }
        }).catch(error=>{
            res.send({success:false,staus:500,message:error.message})
        })
        
    }
}


module.exports={addCustomer,getAll,getSingle, updateCustomer}