const table=require('./tableModel')
const fs=require('fs')
const addTable=async(req,res)=>{
    let validation=""
    if(!req.body.tableName)
        validation+='tableName is required'
    if(!req.body.description)
     validation +='table description is required..' 
    if(!req.body.image)
        validation+='image is required'
    if(!req.body.seats)
     validation +='seats is required..'
    if(!!validation)
    res.send({success:false,status:300,message:validation})
    else{
    let total=await table.countDocuments()
    let newtable= new table({
        tableId:total+1,
        tableName:req.body.tableName,
        description:req.body.description,
        seats:req.body.seats,
        image:req.body.image
    })
    let prevTable=await table.findOne({tableName:req.body.tableName})
    if(!!prevTable)
        res.send({success:false,status:500,message:"table already exist with same name"})
    else
    newtable.save()
    .then((result)=>{
        res.json({
            success:true,
            status:200,
            message:'table added',
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
    table.find(req.body)
    .then((result)=>{
        res.json({
            success:true,
            status:200,
            message:" all table loaded",
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
const getSingle = (req,res)=>{
    let validation=''
    if(!req.body._id)
        validation+='_id is required'
    if(!!validation)
        res.send({success:false,status:500,message:validation})
    else{
        table.findOne({'_id':req.body._id})
    .then(result=>{
            if(result==null)
                res.send({success:false,status:470,message:"No Table category found"})
            else{
                if(!!req.body.tableName)
                result.categoryName=req.body.categoryName
                if(!!req.body.image)
                result.image=req.body.image
                if(!!req.body.description)
                result.description=req.body.description
                if(!!req.body.seats)
                result.seats=req.body.seats
                result.save()
                .then(result=>{
                    res.send({success:true,status:200,message:'single table loaded',data:result})
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

const updateTable=(req,res)=>{
    let validation=''
    if(!req.body._id)
    validation+='_id is required'
    if(!!validation)
    res.send({success:false,status:450,message:validation})
    else{
        table.findOne({_id:req.body._id})
        .then(async result=>{
            if(result==null)
            res.send({success:false,status:400,message:'No table found'})
            else{
                if(!!req.body.tableName)
                result.tableName=req.body.tableName
                if(req.body.description)
                result.description=req.body.description
                if(!!req.body.image){
                    fs.unlinkSync('server/public/'+result.image)
                    result.image=req.body.image
                }
                if(req.body.seats)
                result.seats=req.body.seats
                // let prevTable=await table.findOne({$and:[{TabldName:req.body.TableName},{_id:{$ne:result._id}}]})
                // if(!!prevTable)
                //     res.send({success:false,status:500,message:'Table already exists with same name'})
                result.save()
                .then(updatedRes=>{
                    res.send({success:true,status:200,message:"table updated",data:updatedRes})
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
        table.findOne({_id:req.body._id})
        .then(result=>{
            if(result==null)
                res.send({success:false,status:500,message:"no table found"})
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
module.exports={addTable,getAll,getSingle,updateTable,changeStatus}