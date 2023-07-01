const user=require('../apis/user/userModel')
const bcrypt=require('bcrypt')
user.findOne({email:'admin@gmail.com'})

.then(result=>{
    if(result==null)
    {
        let admin=new user({
            userId:1,
            name:"Admin",
            email:'admin@gmail.com',
            password:bcrypt.hashSync('123',10),
            userType:1
        })
        admin.save()
        .then(saveResult=>{
            console.log('admin created')
        })
        .catch(err=>{
            console.log('error',err)
        })
    }
    else{
        console.log("admin already exists")
    }
}).catch(err=>{
    console.log("erroe in admin",err)
})