const mongoose = require("mongoose");

const dashboardSchema = mongoose.Schema({
    "FirstName": String,
    "LastName": String,
    "Email": String,
    "Department": { type: String, enum: ["Tech", "Marketing", "Operations"] },
    "Salary": Number
})

const DashboardModel = mongoose.model("dashboard", dashboardSchema)
module.exports = { DashboardModel }