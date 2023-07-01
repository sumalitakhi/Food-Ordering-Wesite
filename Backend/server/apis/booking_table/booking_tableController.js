const bookingTable=require('./booking_tableModel')
const addBooking=async(req,res)=>{
    let validation=""
    if(!req.body.userId)
        validation+='userId is required'
    if(!req.body.tableId)
     validation +='tableId is required..'
    if(!req.body.date)
     validation +='date is required..'
    if(!req.body.name)
     validation +='name is required..'
     if(!req.body.time)
     validation +='time is required..'
     if(!req.body.description)
     validation +='description is required..'
    if(!!validation)
    res.send({success:false,status:300,message:validation})
    else{
let total=await bookingTable.countDocuments()
let newbooking=new bookingTable({
    bookingId:total+1,
    userId:req.body.userId,
    tableId:req.body.tableId,
    date :req.body.date,
    name :req.body.name,
    time:req.body.time,
    description:req.body.description
})
newbooking.save()
.then((result)=>{
    res.json({
        success:true,
        status:200,
        message:'booking added',
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
    bookingTable.find(req.body).populate('userId').populate('tableId')
    .then((result)=>{
        res.json({
            success:true,
            status:true,
            message:" all product loaded",
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


const getSingle = (req,res)=>{
    let validation=''
    if(!req.body._id)
        validation+='_id is required'
    if(!!validation)
        res.send({success:false,status:500,message:validation})
    else{
        bookingTable.findOne({'_id':req.body._id}).populate('tableId').populate('userId')
    .then(result=>{
            if(result==null)
                res.send({success:false,status:470,message:"No Table booking found"})
            else{
                if(!!req.body.userId)
                result.userId=req.body.userId
                if(!!req.body.tableId)
                result.tableId=req.body.tableId
                if(!!req.body.date)
                result.date=req.body.date
                if(!!req.body.time)
                result.time=req.body.time
                if(!!req.body.description)
                result.description=req.body.description
                result.save()
                .then(result=>{
                    res.send({success:true,status:200,message:'single table booking loaded',data:result})
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

const updateBooking=(req,res)=>{
    let validation=''
    if(!req.body._id)
    validation+='_id is required'
    if(!!validation)
    res.send({success:false,status:450,message:validation})
    else{
        bookingTable.findOne({_id:req.body._id})
        .then(result=>{
            if(result==null)
            res.send({success:false,status:400,message:'No table booking found'})
            else{
                if(!!req.body.userId)
                result.userId=req.body.userId
                if(!!req.body.tableId)
                result.tableId=req.body.tableId
                if(!!req.body.date)
                result.date=req.body.date
                if(!!req.body.time)
                result.time=req.body.time
                if(!!req.body.description)
                result.description=req.body.description
                result.save()
                .then(updatedRes=>{
                    res.send({success:true,status:200,message:"booking updated",data:updatedRes})
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
        bookingTable.findOne({_id:req.body._id})
        .then(result=>{
            if(result==null)
                res.send({success:false,status:500,message:"no booking found"})
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
module.exports={addBooking,getAll,getSingle,updateBooking,changeStatus}