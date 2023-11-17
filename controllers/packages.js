import Package from "../models/Package.js";
import Member from "../models/Member.js";
import { user } from "./employees.js";
import { Astar } from "../Algorithm/Astar.js";
import { sendMail } from "../send_email.js";

// Create
export const createPackage = (req, res) => {
    try {
        var srcToDestPath = Astar(req.body.sourceCity, req.body.destinationCity);
        var packID = (Math.random() + 1).toString(36).substring(1);
        var packgCost = Number(req.body.packageWeight) * 150;
        sendMail(req.body.userEmail, packID, packgCost);
        var packageInfo = {
            packageID: packID,
            sourceCity: req.body.sourceCity,
            destinationCity: req.body.destinationCity,
            destPostalCode: req.body.destPostalCode,
            destAddress: req.body.destAddress,
            packageWeight: req.body.packageWeight,
            dimensions: req.body.dimensions,
            isSensitive: req.body.isSensitive,
            estimatedCost: Number(req.body.packageWeight) * 150,
            isDelivered: false,
            path: srcToDestPath
        }

        Package.findOne({ usercnic: req.body.usercnic }, (error, user) => {
            if (error) console.log(error);
            else {
                if (user && user.isMember) {
                    Member.findOne({ memberID: req.body.membershipCode }, (error, member) => {
                        const discount = packageInfo.estimatedCost * member.membershipPercentage;
                        packageInfo.estimatedCost = packageInfo.estimatedCost - discount;
                        user.package.push(packageInfo);
                        user.save(() => res.redirect("package"));
                    })
                } else {
                    const newUser = new Package({
                        fullName: req.body.fullName,
                        usercnic: req.body.usercnic,
                        userEmail: req.body.userEmail,
                        contactNo: req.body.contactNo,
                        isMember: false
                    });
                    newUser.save((error) => {
                        if (!error) {
                            newUser.package.push(packageInfo);
                            newUser.save();
                            res.redirect("package");
                        } else res.send(error);
                    })
                }
            }
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


// Read
export const readPackage = (req, res) => {
    Package.find((error, packages) => {
        if (packages) res.render("admin/package-log", { user, packages });
        else console.log(error);
    })
}