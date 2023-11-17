import Member from "../models/Member.js";
import Package from "../models/Package.js";

// Create
export const createMember = (req, res) => {
    try {
        var selectedPackage = req.body.package;
        var membPrice;
        var membPercent;
        var endDate = new Date();
        switch(selectedPackage) {
          case "classic-lite":
            membPrice = 2499;
            membPercent = 0.05;
            endDate.setDate(new Date().getDate() + 182);
            break;
          case "classic-pro":
            membPrice = 5999;
            membPercent = 0.05;
            endDate.setDate(new Date().getDate() + 365);
            break;
          case "gold":
            membPrice = 9999;
            membPercent = 0.15;
            endDate.setDate(new Date().getDate() + 365);
            break;
          case "premium":
            membPrice = 19999;
            membPercent = 0.30;
            endDate.setDate(new Date().getDate() + 365);
            break;
        }
        const newMember = new Member({
            memberID: (Math.random() + 1).toString(36).substring(3),
            memberCnic: req.body.memberCnic,
            membershipPrice: membPrice,
            membershipPercentage: membPercent,
            memb_StartDate: new Date(),
            memb_EndDate: endDate,
            cardNo: req.body.cardNo,
            cardHolder: req.body.card_holder_name,
            securitykey: req.body.securitykey,
            card_expiryMonth: req.body.card_expiry_month,
            card_expiryYear: req.body.card_expiry_year
        });
    
        var cardExpYear = req.body.card_expiry_year;
        var currentYear = new Date().getFullYear().toString();
        if (cardExpYear == null && (cardExpYear.slice(2) < currentYear.slice(2) || cardExpYear.slice(0, 2) != 20)) {
          console.log("Invalid data!");
        } else {
          newMember.save();
          Package.findOne({ usercnic: req.body.memberCnic }, (error, user) => {
            if (user) {
              user.isMember = true;
              user.save();
            } else console.log(error);
          })
          if (req.body.memberName != undefined) res.redirect("membership");
        };

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


var memberFound;
export { memberFound };

// Find a member
export const findMember = (req, res) => {
  Member.findOne({ memberCnic: req.body.memberCnic }, (error, member) => {
    if (member) {
      memberFound = member;
      console.log(member);
    } else console.log(error);
  })
}