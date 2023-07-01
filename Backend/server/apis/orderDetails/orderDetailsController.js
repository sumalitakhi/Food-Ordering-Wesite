const orderDetail=require('./orderDetailsModel')
// const addOrderDetail=async(req,res)=>{
//     let validation=""
//     if(!req.body.orderId)
//         validation+=' orderId is required'
//     if(!req.body.productId)
//         validation+='productId is required'
//     if(!req.body.quantity)
//         validation+='quantity is required'
//     if(!req.body.price)
//         validation+='price is required'
//     if(!!validation)
//         res.send({success:false,status:500,message:validation})
//     else{
//     let total=await orderDetail.countDocuments()
//     let newOrderDetail=new orderDetail({
//         orderDetailId:total+1,
//         orderId:req.body.orderId,
//         productId:req.body.productId,
//         quantity:req.body.quantity,
//         price:req.body.price,
       

//     })
//     newOrderDetail.save()
//     .then((result)=>{
//         res.send({success:true,status:200,message:" order details added",data:result})
//     })
//     .catch(err=>{
//         res.send({success:false,status:500,message:err.message})
//     })
// } 
// }

const getAll=(req,res)=>{
    orderDetail.find(req.body).populate('productId')
    .then(result=>{
        res.send({success:true,status:200,message:"Order Detail",data:result})
    }).catch(err=>{
        res.send({success:false,status:500,message:err.message})
    })
}

const getSingle = (req,res)=>{
    let validation=''
    if(!req.body._id)
        validation+='_id is required'
    if(!!validation)
        res.send({success:false,status:500,message:validation})
    else{
        orderDetail.findOne({'_id':req.body._id})
    .then(result=>{
            if(result==null)
                res.send({success:false,status:470,message:"No order found"})
            else{
                if(!!req.body.orderId)
                result.orderId=req.body.orderId
                if(!!req.body.productId)
                result.productId=req.body.productId
                if(!!req.body.quantity)
                result.quantity=req.body.quantity
                if(!!req.body.price)
                result.price=req.body.price
                result.save()
                .then(result=>{
                    res.send({success:true,status:200,message:'single order show',data:result})
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
module.exports={getAll,getSingle} 