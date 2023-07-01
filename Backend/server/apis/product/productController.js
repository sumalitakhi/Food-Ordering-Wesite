const product=require('./productModel')
const addProduct=async(req,res)=>{
    let validation=""
    if(!req.body.categoryId)
    validation +='category Id is required..'
   if(!req.body.subCategoryId)
    validation +='subcategoryId is required..'
    if(!req.body.productName)
     validation +='product name is required..'
    if(!req.body.price)
     validation +='price is required..'
    if(!req.body.description)
        validation+='description is required'
    if(!req.body.image)
        validation+='image is required'
    if(!!validation)
    res.send({success:false,status:300,message:validation})
    else{
    let total=await product.countDocuments()
    let newproduct=new product({
        productId:total+1,
        categoryId:req.body.categoryId,
        subCategoryId:req.body.subCategoryId,
        productName:req.body.productName,
        price:req.body.price,
        description:req.body.description,
        image:req.body.image

    })
    newproduct.save()
    .then((result)=>{
        res.json({
            success:true,
            status:true,
            message:"Product added",
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
    product.find(req.body).populate('categoryId').populate('subCategoryId')
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
        product.findOne({'_id':req.body._id}).populate('categoryId').populate('subCategoryId')
    .then(result=>{
            if(result==null)
                res.send({success:false,status:470,message:"No product found"})
            else{
                if(!!req.body.categoryId)
                result.categoryId=req.body.categoryId
                if(!!req.body.subCategoryId)
                result.subCategoryId=req.body.subCategoryId
                if(!!req.body.productName)
                result.productName=req.body.productName
                if(!!req.body.price)
                result.price=req.body.price
                if(!!req.body.description)
                result.description=req.body.description
                result.save()
                .then(result=>{
                    res.send({success:true,status:200,message:'single product loaded',data:result})
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

const updateProduct=(req,res)=>{
    let validation=''
    if(!req.body._id)
    validation+='_id is required'
    if(!!validation)
    res.send({success:false,status:450,message:validation})
    else{
        product.findOne({_id:req.body._id})
        .then(result=>{
            if(result==null)
            res.send({success:false,status:400,message:'No product find'})
            else{
                if(!!req.body.categoryId)
                result.categoryId=req.body.categoryId
                if(!!req.body.subCategoryId)
                result.subCategoryId=req.body.subCategoryId
                if(!!req.body.productName)
                result.productName=req.body.productName
                if(!!req.body.price)
                result.price=req.body.price
                if(!!req.body.description)
                result.description=req.body.description
                if(!!req.body.image)
                result.image=req.body.image
                result.save()
                .then(updatedRes=>{
                    res.send({success:true,status:200,message:"product updated",data:updatedRes})
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
        product.findOne({_id:req.body._id})
        .then(result=>{
            if(result==null)
                res.send({success:false,status:500,message:"no product found"})
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
module.exports ={ addProduct,getAll,getSingle,updateProduct,changeStatus}

