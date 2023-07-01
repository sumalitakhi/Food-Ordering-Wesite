const feedback=require('./FeedbackModel')
const addFeedback=async(req,res)=>{
    let validation=""
    
   if(!req.body.email)
    validation +='Email is required..'
    if(!req.body.name)
     validation +=' name is required..'
    if(!req.body.message)
     validation +='message is required..'
     if(!req.body.phone)
     validation +='phone is required..'
    
    if(!!validation)
    res.send({success:false,status:300,message:validation})
    else{
    let total=await feedback.countDocuments()
    let newfeedback=new feedback({
        feedbackId:total+1,
        email:req.body.email,
        name:req.body.name,
        message:req.body.message,
        phone:req.body.phone

    })
    newfeedback.save()
    .then((result)=>{
        res.json({
            success:true,
            status:true,
            message:"feedback added",
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
    feedback.find(req.body)
    .then((result)=>{
        res.json({
            success:true,
            status:true,
            message:" all feedback loaded",
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


const getsingle = (req,res)=>{
    let validation=''
    if(!req.body._id)
        validation+='_id is required'
    if(!!validation)
        res.send({success:false,status:500,message:validation})
    else{
        feedback.findOne({'_id':req.body._id})
    .then(result=>{
            if(result==null)
                res.send({success:false,status:470,message:"No feedback"})
            else{
                if(!!req.body.email)
                result.email=req.body.email
                if(!!req.body.name)
                result.name=req.body.name
                if(!!req.body.phone)
                result.phone=req.body.phone
                if(!!req.body.message)
                result.message=req.body.message
                
                result.save()
                .then(result=>{
                    res.send({success:true,status:200,message:' feedback show',data:result})
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

const updateFeedback=(req,res)=>{
    let validation=''
    if(!req.body._id)
    validation+='_id is required'
    if(!!validation)
    res.send({success:false,status:450,message:validation})
    else{
        feedback.findOne({_id:req.body._id})
        .then(result=>{
            if(result==null)
            res.send({success:false,status:400,message:'No feedback found'})
            else{
                if(!!req.body.email)
                result.email=req.body.email
                if(!!req.body.name)
                result.name=req.body.name
                if(!!req.body.phone)
                result.phone=req.body.phone
                if(!!req.body.message)
                result.message=req.body.message
                result.save()
                .then(updatedRes=>{
                    res.send({success:true,status:200,message:"feedback updated",data:updatedRes})
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
        feedback.findOne({_id:req.body._id})
        .then(result=>{
            if(result==null)
                res.send({success:false,status:500,message:"no feedback found"})
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
module.exports ={ addFeedback,getAll,getsingle,updateFeedback,changeStatus}
