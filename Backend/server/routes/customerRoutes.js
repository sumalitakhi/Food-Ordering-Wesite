const express=require('express')
const router=express.Router()
const userController=require('../apis/user/userController')
const categoryController=require('../apis/category/categoryController')
const subCategoryController=require('../apis/subCategory/subCategoryController')
const productController=require('../apis/product/productController')
const customerController=require('../apis/customer/customerController')
const tableController=require('../apis/table/tableController')
const booking_tableController=require('../apis/booking_table/booking_tableController')
const  addCartController= require('../apis/addCart/addCartController')
const myOrderController=require('../apis/myOrder/myOrderController')
const orderDetailsController=require('../apis/orderDetails/orderDetailsController')
const feedbackController=require('../apis/Feedback/FeedbackController')
const contactController=require('../apis/contact/contactController')

router.post('/login',userController.login)



router.post('/category/all',categoryController.getAll)
router.post('/category/single',categoryController.getsingle)

router.post('/subCategory/all', subCategoryController.getAll)
router.post('/subCategory/single',subCategoryController.getSingle)

router.post('/product/all',productController.getAll)
router.post('/product/single',productController.getSingle)

router.post('/add',customerController.addCustomer)

router.post('/table/all',tableController.getAll)
router.post('/table/single',tableController.getSingle)


router.post('/feedback/add',feedbackController.addFeedback)
router.post('/feedback/all',feedbackController.getAll)
router.post('/feedback/single',feedbackController.getsingle)

router.post('/contact/add',contactController.addContact)

//token
router.use(require('../middleware/tokenChecker'))


router.post('/all',customerController.getAll)
router.post('/single',customerController.getSingle)
router.post('/update',customerController.updateCustomer)
router.post('/status',userController.changeStatus)

//table reservation
router.post('/booking/add',booking_tableController.addBooking)
router.post('/booking/all',booking_tableController.getAll)
router.post('/booking/single',booking_tableController.getSingle)
router.post('/booking/update',booking_tableController.updateBooking)
router.post('/booking/status',booking_tableController.changeStatus)

router.post('/cart/add',addCartController.addCart)
router.post('/cart/all',addCartController.getAll)
router.post('/cart/single',addCartController.getsingle)
router.post('/cart/del',addCartController.delCart)
router.post('/cart/update',addCartController.updateCart)

router.post('/order/add',myOrderController.addOrder)
router.post('/order/all',myOrderController.getAll)
router.post('/order/single',myOrderController.getSingle)
router.post('/order/update',myOrderController.updateOrder)
router.post('/order/status',myOrderController.changeStatus)

router.post('/details/all',orderDetailsController.getAll)
router.post('/details/single',orderDetailsController.getSingle)


router.post('/feedback/update',feedbackController.updateFeedback)
router.post('/feedback/status',feedbackController.changeStatus)
module.exports=router