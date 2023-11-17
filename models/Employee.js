import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    avatar: { data: String, contentType: String },
    fname: String,
    lname: String,
    emp_id: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    cnic: { type: String, unique: true },
    phoneNo: { type: String, unique: true }
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;