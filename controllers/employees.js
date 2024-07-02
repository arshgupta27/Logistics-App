import Employee from "../models/Employee.js";
import { sendMail } from "../send_email.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Package from "../models/Package.js";

// Register Employee
export const register = async (req, res) => {
    try {
        console.log(req.file);
        const { fname, lname, emp_id, cnic, email, phoneNo, password } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newEmployee = new Employee({ avatar: { data: req.file.originalname, contentType: req.file.mimetype },
        fname, lname, emp_id, email, password: passwordHash, cnic, phoneNo });

        newEmployee.save((error) => {
            if (error) res.send(error);
            else res.redirect("/");
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

var user;
export { user };

// Logging in
export const login = async (req, res) => {
    const JWT_SECRET = "v457hh756fh7n67vn";
    try {
        const { emp_id, password } = req.body;
        const Emp = await Employee.findOne({ emp_id: emp_id });
        if (!Emp) {
            return res.status(400).render("admin/admin-home", { alert: "Employee does not exist." });
        }

        const isMatch = await bcrypt.compare(password, Emp.password);
        if (!isMatch) return res.status(400).render("admin/admin-home", { alert: "Invalid credentials." });
        const token = jwt.sign({ id: Emp._id }, JWT_SECRET);
        delete Emp.password;
        user = Emp;
        res.redirect("admin-index");
        //res.status(200).json({ token, Emp });

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Forget Password
export const forgetPass = async (req, res) => {
    try {
        const { emp_id, email } = req.body;
        const Emp = await Employee.findOne({ emp_id: emp_id });
        if (!Emp) return res.status(400).json({ msg: "Employee does not exist." });
        //sendMail(email);

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

var packg;
export { packg };

// Track order
export const trackParcel = (req, res) => {
    try {
        Package.findOne({"package.packageID": req.body.packageID}, (error, result) => {
            if (error) console.log(error);
            else {
                console.log(result);
                packg = result.package[0]};
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}