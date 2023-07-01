const  employee=require('./employeeModel')
const addEmployee=async(req,res)=>{
    let validation=""
    if(!req.body.name)
        validation+='name is required'
    if(!req.body.email)
     validation +='email is required..'
    if(!req.body.phone)
     validation +='phone is required..'
     if(!req.body.address)
     validation +='address is required..'
     if(!req.body.gender)
     validation +='gender is required..'
     if(!req.body.dateJoining)
     validation +='dateJoining is required..'
     if(!req.body.designation)
     validation +='designation is required..'
     if(!req.body.experience)
     validation+='experience is required'
    if(!!validation)
    res.send({success:false,status:300,message:validation})
    else{
    let total=await employee.countDocuments()
    let newemployee=new employee({
        employeeId:total+1,
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address,
        gender:req.body.gender,
        experience:req.body.experience,
        dateJoining:req.body.dateJoining,
        designation:req.body.designation
    })
    let prevEmployee= await employee.findOne({email:req.body.email})
    if(!!prevEmployee)
        res.send({success:false,status:500,message:"Employee already exists with same email"})
    else
    newemployee.save()
    .then((result)=>{
        res.json({
            success:true,
            status:200,
            message:"Signup Successful",
            data:result

        })
    })
    .catch(err=>{
        res.json({
            success:false,
            status:400,
            message:err.message
        })
    })

}
}
const getAll=(req,res)=>{
    employee.find(req.body)
    .then((result)=>{
        res.json({
            success:true,
            status:200,
            message:" all employee loaded",
            data:result

        })
    })
    .catch(err=>{
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
    employee.findOne({'_id':req.body._id})
    .then((result)=>{
        res.json({
            success:true,
            status:200,
            message:" Single employee loaded",
            data:result

        })
    })
    .catch(err=>{
        res.json({
            success:false,
            status:400,
            message:err.message
        })
    })
}
}

const updateEmployee=(req,res)=>{
    let validation=''
    if(!req.body._id)
    validation+='_id is required'
    if(!!validation)
    res.send({success:false,status:450,message:validation})
    else{
        employee.findOne({_id:req.body._id})
        .then(async result=>{
            if(result==null)
            res.send({success:false,status:400,message:'No employee find'})
            else{
                if(!!req.body.employeeId)
                result.employeeId=req.body.employeeId
                if(req.body.name)
                result.name=req.body.name
                if(!!req.body.phone)
                result.phone=req.body.phone
                if(req.body.email)
                result.email=req.body.email
                if(!!req.body.address)
                result.address=req.body.address
                if(req.body.gender)
                result.gender=req.body.gender
                if(req.body.experience)
                result.experience=req.body.experience
                if(!!req.body.dateJoining)
                result.dateJoining=req.body.dateJoining
                if(req.body.designation)
                result.designation=req.body.designation
                let prevEmp=await employee.findOne({$and:[{email:req.body.email},{_id:{$ne:result._id}}]})
                if(!!prevEmp)
                    res.send({success:false,status:500,message:'employee already exists with same email'})
                result.save()
                .then(updatedRes=>{
                    res.send({success:true,status:200,message:"Employee Information updated",data:updatedRes})
                })
                .catch(error=>{
                    res.send({success:false,status:550,message:error.message})
                })
            }
        })
        .catch(error=>{
                    res.send({success:false,status:400,message:error.message})
                    
        })
    }
}


const changeStatus=(req,res)=>{
    let validation=''
    if(!req.body._id)
        validation+='_id is required'
    if(!req.body.status)
        validation+='status is required'
    if(!!validation)
        res.send({success:false,status:500,message:validation})
    else{
        employee.findOne({_id:req.body._id})
        .then(result=>{
            if(result==null)
                res.send({success:false,status:500,message:"no employee found"})
            else{
                if(!!req.body.status)
                    result.status=req.body.status
                result.save()
                .then(updatedResult=>{
                    res.send({success:true,status:200,message:"status updated",data:updatedResult})
                }).catch(error=>{
                    res.send({success:false,status:500,message:error.message})
                })
            }
        })
        .catch(error=>{
            res.send({success:false,status:500,message:error.message})
        })
    }
}

module.exports = {addEmployee,getAll,getSingle,updateEmployee,changeStatus}