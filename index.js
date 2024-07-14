import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";

import { register, login, forgetPass, trackParcel } from "./controllers/employees.js";
import { createPackage, readPackage } from "./controllers/packages.js";
import { createMember, findMember } from "./controllers/members.js";
import { user, packg } from "./controllers/employees.js";

// App configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('assets'));
app.set('view engine', 'ejs');
PORT = process.env.PORT || 3000;

// Database connection
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://admin-arsh:"+ process.env.PASS + "@cluster0.w8ddq9o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

// define storage for the files
const Storage = multer.diskStorage({
    // destination for files
    destination: (req, file, callback) => {
        callback(null, "assets/uploads/")
    },
    // add back the extension
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

const upload = multer({ storage: Storage });

// routes
app.post("/register", upload.single("avatar"), register);
app.post("/login", login);
app.post("/forgetPass", forgetPass);
app.post("/addPackage", createPackage);
app.post("/membership-form", createMember);
app.post("/trackOrder", trackParcel);   
app.post("/findMember", findMember);

app.get("/package-log", readPackage);
app.get("/logout", (req, res) => { res.redirect("/") });

app.get("/", (req, res) => { res.render("admin/admin-home") });

app.get("/index", (req, res) => { 
    if (packg == undefined) {
        var newPack = {
            packageID: "##",
            sourceCity: "###",
            destinationCity: "###",
            path: ["#"]
        }
        res.render("user/index", { packg: newPack });
    }
    res.render("user/index", { packg });
});

app.get("/about", (req, res) => { res.render("user/about") });

app.get("/services", (req, res) => { res.render("user/services") });

app.get("/contact", (req, res) => { res.render("user/contact") });

app.get("/membership-form", (req, res) => { res.render("user/membership-form") });

app.get("/admin-index", (req, res) => {
    res.render("admin/admin-index", { user });
});

app.get("/package", (req, res) => { res.render("admin/package", { user }) });

app.get("/membership", (req, res) => { res.render("admin/membership", { user }) });

app.get("/tracking", (req, res) => {
    if (packg == undefined) {
        var newPack = {
            packageID: "##",
            sourceCity: "###",
            destinationCity: "###",
            path: ["#"]
        }
        res.render("admin/tracking", { user, packg: newPack });
    }
    res.render("admin/tracking", { user, packg });
});

app.listen(PORT, () => console.log(`Server running on port 3000`));