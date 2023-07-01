const customer=require('../customer/customerModel')
const category=require('../category/categoryModel')
const subCategory=require('../subCategory/subCategoryModel')
const product=require('../product/productModel')
const table=require('../table/tableModel')
const booking=require('../booking_table/booking_tableModel')
const employee=require('../employee/employeeModel')
const order=require('../myOrder/myOrderModel')

const dashboard=async(req,res)=>{
    let totalCustomer=await customer.countDocuments()
    let totalCategories=await category.find({status:true})
    let totalSubCategories=await subCategory.countDocuments()
    let totalproducts=await product.countDocuments()
    let totalTable=await table.countDocuments()
    let bookingTable=await booking.countDocuments()
    let employees=await employee.countDocuments()
    let orders=await order.find({status:"Pending"})
    
    res.send({
        success:true,status:200,message:'Welcome Dashboard',totalCustomer:totalCustomer,totalCategories:totalCategories.length,totalSubCategories:totalSubCategories,
        totalproducts:totalproducts,totalTable:totalTable,bookingTable:bookingTable,
        employees:employees,orders:orders.length
    })
}
module.exports={dashboard}