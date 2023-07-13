const express = require("express");

const { UserModel } = require("../model/user.model");
const { DashboardModel } = require("../model/employee.model");

const dashRoute = express.Router();

dashRoute.post("/employees",async(req,res)=>{
 try {
    const {FirstName,LastName,Email,Department,Salary} = req.body
     const employee = new DashboardModel({FirstName,LastName,Email,Department,Salary});
     await employee.save();
     res.status(200).send({"msg":"employee add"})
 } catch (error) {
    res.status(400).send({"msg":error.message})
 }
})

dashRoute.get("/employees",async(req,res)=>{
    try {
       
        const employee = await DashboardModel.find();
        
        res.status(200).send({"msg":"all employee",employee})
    } catch (error) {
       res.status(400).send({"msg":error.message})
    }
   })

dashRoute.get("/filter",async(req,res)=>{
try {
    const Department = req.query.Department;
    console.log(Department)
    const employee = await DashboardModel.find({Department:Department});
    res.status(200).send({"msg":"filterdata",employee})
} catch (error) {
    res.status(400).send({"msg":error.message})
}
})

dashRoute.get("/sort",async(req,res)=>{
    try {
        const Salary = req.query.Salary
        let sort ={}
        if(Salary==="asc"){
            sort = {Salary:1}
        }else{
            sort={Salary:-1}
        }
        const employee = await DashboardModel.find().sort(sort);
        res.status(200).send({"msg":"sort data",employee})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

dashRoute.get("/search",async(req,res)=>{
    try {
        const {FirstName} = req.query
        const employee = await DashboardModel.find({
            FirstName:{ $regex: new RegExp(FirstName,'i')}
        })
        if(employee.length===0){
           return  res.status(400).send({"msg":"no employee"}) 
        }
        res.status(200).send({"msg":"search data",employee})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

module.exports = { dashRoute }
