const empAttendance=require('./attendanceModel')
const addAttendance=async(req,res)=>{
    let validation=""
    if(!req.body.employeeId)
        validation+='employee Id is required'
    if(!req.body.attendance)
        validation+='attendance is required.'
    if(!req.body.date)
        validation+='date is required'
    if(!!validation)
    res.send({success:false,status:200,message:validation})
    else{
        let total=await empAttendance.countDocuments()
        let newempAttendance=new empAttendance({
            attendanceId:total+1,
            employeeId:req.body.employeeId,
            attendance:req.body.attendance,
            date:req.body.date
        })
        newempAttendance.save()
        .then((result)=>{
            res.json({
                success:true,
                status:200,
                message:"attendance added",
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
    empAttendance.find(req.body).populate('employeeId')
    .then(result=>{
        res.send({success:true,status:200,message:"all attendance",data:result})
    }).catch(err=>{
        res.send({success:false,status:500,message:err.message})
    })
}


const getsingle = (req,res)=>{
    let validation=''
    if(!req.body._id)
        validation+='_id is required'
    if(!!validation)
        res.send({success:false,status:500,message:validation})
    else{
        empAttendance.findOne({'_id':req.body._id}).populate('employeeId')
    .then(result=>{
            if(result==null)
                res.send({success:false,status:470,message:"No attendance value"})
            else{
                if(!!req.body.employeeId)
                result.employeeId=req.body.employeeId
                if(!!req.body.attendance)
                result.attendance=req.body.attendance
                if(!!req.body.date)
                result.date=req.body.date
                result.save()
                .then(result=>{
                    res.send({success:true,status:200,message:' Attendance show',data:result})
                })
                .catch(error=>{
                    res.send({success:false,status:450,message:error})
                })
            }
    
        
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
const updateAttendance=(req,res)=>{
    let validation=''
    if(!req.body._id)
    validation+='_id is required'
    if(!!validation)
    res.send({success:false,status:450,message:validation})
    else{
        empAttendance.findOne({_id:req.body._id})
        .then(result=>{
            if(result==null)
            res.send({success:false,status:400,message:'No employee attendance found'})
            else{
                if(!!req.body.employeeId)
                result.employeeId=req.body.employeeId
                if(!!req.body.attendance)
                result.attendance=req.body.attendance
                if(!!req.body.date)
                result.date=req.body.date
                result.save()
                .then(updatedRes=>{
                    res.send({success:true,status:200,message:"employee attendance updated",data:updatedRes})
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

const changestatus=(req,res)=>{
    let validation=''
    if(!req.body._id)
        validation+='_id is required'
    if(!req.body.status)
        validation+='status is required'
    if(!!validation)
        res.send({success:false,status:500,message:validation})
    else{
        empAttendance.findOne({_id:req.body._id})
        .then(result=>{
            if(result==null)
                res.send({success:false,status:500,message:"no employee attendance found"})
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
module.exports={addAttendance,getAll,getsingle,updateAttendance,changestatus}