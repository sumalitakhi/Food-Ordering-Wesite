const contact=require('./contactModel')
const addContact=async(req,res)=>{
    let validation=""
    
   if(!req.body.message)
    validation +='Message is required..'
    if(!req.body.name)
     validation +=' Name is required..'
    if(!req.body.email)
     validation +='Email is required..'
     
    
    if(!!validation)
    res.send({success:false,status:300,message:validation})
    else{
    let total=await contact.countDocuments()
    let newContact=new contact({
        contactId:total+1,
        email:req.body.email,
        name:req.body.name,
        message:req.body.message
       

    })
    newContact.save()
    .then((result)=>{
        res.json({
            success:true,
            status:true,
            message:"Added Message",
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
    contact.find(req.body)
    .then((result)=>{
        res.json({
            success:true,
            status:true,
            message:"  List View ",
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
module.exports={addContact,getAll}