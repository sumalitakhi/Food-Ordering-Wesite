const subCategory=require('./subCategoryModel')
const fs=require('fs')
const addSubCategory=async(req,res)=>{
    let validation=""
    if(!req.body.categoryId)
        validation+='categoryId is required'
    if(!req.body.subCategoryName)
     validation +='SubCategory name is required..'
    if(!req.body.image)
     validation +='image is required..'
    if(!!validation)
    res.send({success:false,status:300,message:validation})
    else{
    let total=await subCategory.countDocuments()
    let newsubCategory=new subCategory({
        subCategoryId:total+1,
        categoryId:req.body.categoryId,
        subCategoryName:req.body.subCategoryName,
        image:req.body.image

    })
    let prevSubCategory= await subCategory.findOne({subCategoryName:req.body.subCategoryName})
    if(!!prevSubCategory)
        res.send({success:false,status:500,message:"sub category already exists with same name"})
    else
    newsubCategory.save()
    .then((result)=>{
        res.json({
            success:true,
            status:true,
            message:"Sub Category Added",
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
    subCategory.find(req.body).populate('categoryId')
    .then((result)=>{
        res.json({
            success:true,
            status:true,
            message:" all Sub Category loaded",
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
        subCategory.findOne({'_id':req.body._id}).populate('categoryId')
    .then(result=>{
            if(result==null)
                res.send({success:false,status:470,message:"No sub categpry found"})
            else{
                if(!!req.body.categoryId)
                result.categoryId=req.body.categoryId
                if(!!req.body.subCategoryName)
                result.subCategoryName=req.body.subCategoryName
                if(!!req.body.image)
                result.image=req.body.image
                
                result.save()
                .then(result=>{
                    res.send({success:true,status:200,message:'single sub category loaded',data:result})
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

const updateSubCategory=(req,res)=>{
    let validation=''
    if(!req.body._id)
    validation+='_id is required'
    if(!!validation)
    res.send({success:false,status:450,message:validation})
    else{
        subCategory.findOne({_id:req.body._id})
        .then(async result=>{
            if(result==null)
            res.send({success:false,status:400,message:'No sub category find'})
            else{
                if(!!req.body.subCategoryName)
                result.subCategoryName=req.body.subCategoryName
                if(!!req.body.categoryId)
                result.categoryId=req.body.categoryId
                if(req.body.image)
                {
                    fs.unlinkSync('server/public/'+result.image)
                    result.image=req.body.image
                }
               
                // let prevSubCategory=await subCategory.findOne({$and:[{subCategoryName:req.body.subCategoryName},{_id:{$ne:result._id}}]})
                // if(!!prevSubCategory)
                //     res.send({success:false,status:500,message:' sub category already exists with same name'})
                result.save()
                .then(updatedRes=>{
                    res.send({success:true,status:200,message:"sub-category updated",data:updatedRes})
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
        subCategory.findOne({_id:req.body._id})
        .then(result=>{
            if(result==null)
                res.send({success:false,status:500,message:"no sub category found"})
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
module.exports={addSubCategory,getAll,getSingle,updateSubCategory,changeStatus}
