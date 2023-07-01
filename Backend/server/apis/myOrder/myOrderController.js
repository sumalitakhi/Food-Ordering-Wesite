const order=require('./myOrderModel')
const orderdetail=require('../orderDetails/orderDetailsModel')
const cart=require('../addCart/addCartModel')
const addOrder=async(req,res)=>{
    let validation=""
    if(!req.body.userId)
        validation+='UserId is reuired'
    if(!req.body.name)
        validation+='Name is required'
    if(!req.body.contact)
        validation+='Contact is required'
    if(!req.body.address)
        validation+='shipping address is required'
    if(!req.body.amount)
        validation+='amount is required'
    if(!req.body.paymentType)
        validation+='payment type is required'
    if(!!validation)
        res.send({success:false,status:500,message:validation})
    else{
    let total=await order.countDocuments()
    let newOrder=new order({
        orderId:total+1,
        userId:req.body.userId,
        name:req.body.name,
        contact:req.body.contact,
        address:req.body.address,
        amount:req.body.amount,
        paymentType:req.body.paymentType,
        cardName:req.body.cardName,
        cardNumber:req.body.cardNumber,
        cvv:req.body.cvv,
        expDate:req.body.expDate,
    })

    newOrder.save()
    .then(async (result)=>{
        let products = JSON.parse(req.body.prodList)
        for (let index = 0; index < products.length; index++) {
            const element = products[index];
            let newOD = orderdetail({
                orderId:result._id,
                productId:element.productId,
                quantity:element.quantity,
                price:element.price
            })
            newOD.save()
           
        };
        cart.deleteMany({userId:req.body.userId})
        .then((delResult)=>{
            res.send({success:true, status:200, message:'Order Placed', data:result})
        }).catch(err=>{
            res.send({success:false,status:500,message:err.message})
        })
    })
    .catch(err=>{
        res.send({success:false,status:500,message:err.message})
    })
} 
}




const getAll=(req,res)=>{
    order.find(req.body).populate('userId')
    .then(result=>{
        res.send({success:true,status:200,message:"all order loaded",data:result})
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
        order.findOne({'_id':req.body._id}).populate('userId')
    .then(result=>{
            if(result==null)
                res.send({success:false,status:470,message:"No order found"})
            else{
                if(!!req.body.userId)
                result.userId=req.body.userId
                if(!!req.body.name)
                result.name=req.body.name
                if(!!req.body.contact)
                result.contact=req.body.contact
                if(!!req.body.address)
                result.address=req.body.address
                if(!!req.body.amount)
                result.amount=req.body.amount
                if(!!req.body.paymentType)
                result.paymentType=req.body.paymentType
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

const updateOrder=(req,res)=>{
    let validation=''
    if(!req.body._id)
    validation+='_id is required'
    if(!!validation)
    res.send({success:false,status:450,message:validation})
    else{
        order.findOne({_id:req.body._id})
        .then(result=>{
            if(result==null)
            res.send({success:false,status:400,message:' My order no found'})
            else{
                if(!!req.body.userId)
                result.userId=req.body.userId
                if(!!req.body.name)
                result.name=req.body.name
                if(!!req.body.contact)
                result.contact=req.body.contact
                if(!!req.body.address)
                result.address=req.body.address
                if(!!req.body.amount)
                result.amount=req.body.amount
                if(!!req.body.paymentType)
                result.paymentType=req.body.paymentType
                result.save()
                .then(updatedRes=>{
                    res.send({success:true,status:200,message:"order updated",data:updatedRes})
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
        order.findOne({_id:req.body._id})
        .then(result=>{
            if(result==null)
                res.send({success:false,status:500,message:"no order found"})
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
module.exports={addOrder,getAll,getSingle,updateOrder,changeStatus}