const category=require('./categoryModel')
const fs=require('fs')
const addCategory = async(req,res)=>{
    let validation=""
    if(!req.body.categoryName)
     validation +='category name is required..'
    if(!req.body.image)
     validation +='image is required..'
    if(!!validation)
    res.send({success:false,status:300,message:validation})
    else{
        let total=await category.countDocuments()
    let newCategory=new category({
        categoryId:total+1,
        categoryName:req.body.categoryName,
        image:req.body.image
    })
    let prevCategory= await category.findOne({categoryName:req.body.categoryName})
    if(!!prevCategory)
        res.send({success:false,status:500,message:"category already exists with same name"})
    else
    newCategory.save()
    .then((result)=>{
        res.json({
            success:true, 
            status:true,
            message:"Category added",
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
        category.find(req.body).sort({createdAt:-1})
    .then((result)=>{
        res.json({
            success:true,
            status:true,
            message:" all category loaded",
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
        category.findOne({'_id':req.body._id})
    .then(result=>{
            if(result==null)
                res.send({success:false,status:470,message:"No category find"})
            else{
                if(!!req.body.categoryName)
                result.categoryName=req.body.categoryName
                if(!!req.body.image)
                result.image=req.body.image
                result.save()
                .then(result=>{
                    res.send({success:true,status:200,message:'single category loaded',data:result})
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
const updateCategory=(req,res)=>{
    let validation=''
    if(!req.body._id)
    validation+='_id is required'
    if(!!validation)
    res.send({success:false,status:450,message:validation})
    else{
        category.findOne({_id:req.body._id})
        .then(async result=>{
            if(result==null)
            res.send({success:false,status:400,message:'No category find'})
            else{
                if(!!req.body.categoryName)
                    result.categoryName=req.body.categoryName
                if(!!req.body.image){
                    fs.unlinkSync('server/public/'+result.image)
                    result.image=req.body.image
                }
                   
                result.save()
                .then(updatedRes=>{
                    res.send({success:true,status:200,message:"category updated",data:updatedRes})
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
        category.findOne({_id:req.body._id})
        .then(result=>{
            if(result==null)
                res.send({success:false,status:500,message:"no category found"})
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
module.exports ={ addCategory,getAll,getsingle,updateCategory,changeStatus}