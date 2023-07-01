const cart=require('./addCartModel')
const addCart=async(req,res)=>{
    let validation=""
   
    if(!req.body.productId)
        validation+='productId is reuired'
    if(!req.body.quantity)
        validation+='quantity is required'
    if(!req.body.userId)
        validation+='userId is required'
    if(!!validation)
        res.send({success:false,status:500,message:validation})
    else{
    let newCart=new cart({
        productId:req.body.productId,
        quantity:parseInt(req.body.quantity),
        userId:req.body.userId

    })
    let prevcartItem = await cart.findOne({userId:req.body.userId, productId:req.body.productId})
    if(!!prevcartItem)
        res.send({success:false,status:500,message:"Already in cart"})
    else 
    newCart.save()
    .then((result)=>{
        res.send({success:true,status:200,message:"Added to cart",data:result})
    })
    .catch(err=>{
        res.send({success:false,status:500,message:err.message})
    })
} 
}

const getAll=(req,res)=>{
    cart.find(req.body).populate('productId')
    .then(result=>{
        res.send({success:true,status:200,message:"all cart values",data:result})
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
        cart.findOne({'_id':req.body._id}).populate('productId')
    .then(result=>{
            if(result==null)
                res.send({success:false,status:470,message:"No value find"})
            else{
                if(!!req.body.productId)
                result.productName=req.body.productName
                if(!!req.body.quantity)
                result.quantity=req.body.quantity
                if(!!req.body.price)
                result.price=req.body.price
                result.save()
                .then(result=>{
                    res.send({success:true,status:200,message:'Add to cart loaded',data:result})
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

const delCart=(req,res)=>{
    let validation=''
    if(!req.body._id)
        validation+='_id is required'
    if(!!validation)
        res.send({success:false,status:500,message:validation})
    else{
    cart.deleteOne({_id:req.body._id})
    .then(result=>{
        res.send({success:true,status:200,message:"deleted",data:result})
    }).catch(err=>{
        res.send({success:false,status:500,message:err.message})
    })
}
}

const updateCart=(req,res)=>{
    let validation=''
    if(!req.body._id)
    validation+='_id is required'
    if(!!validation)
    res.send({success:false,status:450,message:validation})
    else{
        cart.findOne({_id:req.body._id})
        .then(result=>{
            if(result==null)
            res.send({success:false,status:400,message:'No cart item found'})
            else{
                if(!!req.body.quantity)
                result.quantity=req.body.quantity
                result.save()
                .then(updatedRes=>{
                    res.send({success:true,status:200,message:"cart updated",data:updatedRes})
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
module. exports={addCart,getAll,delCart,getsingle,updateCart}