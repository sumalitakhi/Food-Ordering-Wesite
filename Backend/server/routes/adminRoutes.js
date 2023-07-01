const express=require('express')
const router=express.Router()
const userController=require('../apis/user/userController')
const categoryController=require('../apis/category/categoryController')
const subCategoryController=require('../apis/subCategory/subCategoryController')
const productController=require('../apis/product/productController')
const employeeController=require('../apis/employee/employeeController')
const attendanceController=require('../apis/attendance/attendanceController')
const tableController=require('../apis/table/tableController')
const booking_tableController=require('../apis/booking_table/booking_tableController')
const myOrderController=require('../apis/myOrder/myOrderController')
const orderDetailsController=require('../apis/orderDetails/orderDetailsController')
const feedbackController=require('../apis/Feedback/FeedbackController')
const contactController=require('../apis/contact/contactController')
const dashboardController=require('../apis/dashboard/dashboardController')
const multer=require('multer')

const categoryStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"server/public/category/")
    },
    filename:(req,file,cb)=>{
        let picname=Date.now()+file.originalname 
        req.body.image='category/'+picname
        cb(null,picname)
    }
})
const categoryUpload=multer({storage:categoryStorage})

router.post('/login',userController.login)
router.post('/adminPassword',userController.changePassword)

//category
router.post('/category/all', categoryController.getAll)
router.post('/category/single',categoryController.getsingle)

//subCategory
router.post('/subCategory/all', subCategoryController.getAll)
router.post('/subCategory/single',subCategoryController.getSingle)

//table
router.post('/table/all',tableController.getAll)
router.post('/table/single',tableController.getSingle)

//feedback
router.post('/feedback/all',feedbackController.getAll)
router.post('/feedback/single',feedbackController.getsingle)

//employee
router.post('/employee/all',employeeController.getAll)
router.post('/employee/single',employeeController.getSingle)

router.post('/contact/all',contactController.getAll)

router.post('/product/all',productController.getAll)
router.post('/product/single',productController.getSingle)



//token
router.use(require('../middleware/tokenChecker'))

router.get('/dashboard',dashboardController.dashboard)

router.post('/category/add', categoryUpload.single('image'),categoryController.addCategory)
router.post('/category/update',categoryUpload.single('image'),categoryController.updateCategory)
router.post('/category/status',categoryController.changeStatus)


const subCategoryStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"server/public/subCategory/")
    },
    filename:(req,file,cb)=>{
        let picname=Date.now()+file.originalname
        req.body.image='subCategory/'+picname
        cb(null,picname)
    }
})
const subCategoryUpload=multer({storage:subCategoryStorage})
router.post('/subCategory/add', subCategoryUpload.single('image'),  subCategoryController.addSubCategory)
router.post('/subCategory/update',subCategoryUpload.single('image'),  subCategoryController.updateSubCategory)
router.post('/subCategory/status',subCategoryController.changeStatus)


const productStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"server/public/product/")
    },
    filename:(req,file,cb)=>{
        let picname=Date.now()+file.originalname
        req.body.image='product/'+picname
        cb(null,picname)
    }
})
const productUpload=multer({storage:productStorage})
router.post('/product/add', productUpload.single('image'),productController.addProduct)
router.post('/product/update', productUpload.single('image'),productController.updateProduct)
router.post('/product/status',productController.changeStatus)

router.post('/employee/add',employeeController.addEmployee)

router.post('/employee/update',employeeController.updateEmployee)
router.post('/employee/status',employeeController.changeStatus)

router.post('/attendance/add',attendanceController.addAttendance)
router.post('/attendance/all',attendanceController.getAll)
router.post('/attendance/single',attendanceController.getsingle)
router.post('/attendance/update',attendanceController.updateAttendance)
router.post('/attendance/status',attendanceController.changestatus)

const tableStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"server/public/table/")
    },
    filename:(req,file,cb)=>{
        let picname=Date.now()+file.originalname
        req.body.image='table/'+picname
        cb(null,picname)
    }
})
const tableUpload=multer({storage:tableStorage})
router.post('/table/add',tableUpload.single('image'),tableController.addTable)

router.post("/table/update",tableUpload.single('image'),tableController.updateTable)
router.post('/table/status',tableController.changeStatus)

router.post('/booking/all',booking_tableController.getAll)
router.post('/booking/single',booking_tableController.getSingle)

router.post('/order/all',myOrderController.getAll)
router.post('/order/single',myOrderController.getSingle)

router.post('/details/all',orderDetailsController.getAll)
router.post('/details/single',orderDetailsController.getSingle)


module.exports=router